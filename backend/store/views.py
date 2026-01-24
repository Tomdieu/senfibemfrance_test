from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Product, Cart, CartItem, Order, OrderItem, SubscriptionPlan, UserSubscription
from .serializers import (
    ProductSerializer, CartSerializer, OrderSerializer, 
    SubscriptionPlanSerializer, UserSubscriptionSerializer
)
import uuid
from drf_yasg.utils import swagger_auto_schema

from django.utils.decorators import method_decorator

from core.permissions import IsAdminOrReadOnly

@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Store products']))
@method_decorator(name='create', decorator=swagger_auto_schema(tags=['Store products']))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=['Store products']))
@method_decorator(name='update', decorator=swagger_auto_schema(tags=['Store products']))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(tags=['Store products']))
@method_decorator(name='destroy', decorator=swagger_auto_schema(tags=['Store products']))
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]
    filterset_fields = ['name', 'is_active']

@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Store Plans']))
@method_decorator(name='create', decorator=swagger_auto_schema(tags=['Store Plans']))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=['Store Plans']))
@method_decorator(name='update', decorator=swagger_auto_schema(tags=['Store Plans']))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(tags=['Store Plans']))
@method_decorator(name='destroy', decorator=swagger_auto_schema(tags=['Store Plans']))
class SubscriptionPlanViewSet(viewsets.ModelViewSet):
    queryset = SubscriptionPlan.objects.filter(is_active=True)
    serializer_class = SubscriptionPlanSerializer
    permission_classes = [IsAdminOrReadOnly]
    filterset_fields = ['name', 'is_active']

@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Store User Subscriptions']))
@method_decorator(name='create', decorator=swagger_auto_schema(tags=['Store User Subscriptions']))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=['Store User Subscriptions']))
@method_decorator(name='update', decorator=swagger_auto_schema(tags=['Store User Subscriptions']))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(tags=['Store User Subscriptions']))
@method_decorator(name='destroy', decorator=swagger_auto_schema(tags=['Store User Subscriptions']))
class UserSubscriptionViewSet(viewsets.ModelViewSet):
    queryset = UserSubscription.objects.all()
    serializer_class = UserSubscriptionSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['user', 'plan', 'is_active']

    def get_queryset(self):
        if self.request.user.role == 'ADMIN':
            return UserSubscription.objects.all()
        return UserSubscription.objects.filter(user=self.request.user)

@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Store Cart']))
@method_decorator(name='add_item', decorator=swagger_auto_schema(tags=['Store Cart']))
class CartViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def add_item(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        product_id = request.data.get('product_id')
        plan_id = request.data.get('plan_id')
        quantity = int(request.data.get('quantity', 1))
        
        if product_id:
            try:
                product = Product.objects.get(id=product_id)
                item, created = CartItem.objects.get_or_create(cart=cart, product=product)
            except Product.DoesNotExist:
                 return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        elif plan_id:
            try:
                plan = SubscriptionPlan.objects.get(id=plan_id)
                item, created = CartItem.objects.get_or_create(cart=cart, subscription_plan=plan)
            except SubscriptionPlan.DoesNotExist:
                 return Response({'error': 'Plan not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Provide product_id or plan_id'}, status=status.HTTP_400_BAD_REQUEST)

        if not created:
            item.quantity += quantity
        else:
            item.quantity = quantity
        item.save()
        
        return Response({'status': 'Item added'}, status=status.HTTP_200_OK)

@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Store Cart Items']))
@method_decorator(name='create', decorator=swagger_auto_schema(tags=['Store Cart Items']))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=['Store Cart Items']))
@method_decorator(name='update', decorator=swagger_auto_schema(tags=['Store Cart Items']))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(tags=['Store Cart Items']))
@method_decorator(name='destroy', decorator=swagger_auto_schema(tags=['Store Cart Items']))
class CartItemViewSet(viewsets.ModelViewSet):
    from .serializers import CartItemSerializer
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(cart__user=self.request.user)

@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Store Orders']))
@method_decorator(name='create', decorator=swagger_auto_schema(tags=['Store Orders']))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=['Store Orders']))
@method_decorator(name='update', decorator=swagger_auto_schema(tags=['Store Orders']))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(tags=['Store Orders']))
@method_decorator(name='destroy', decorator=swagger_auto_schema(tags=['Store Orders']))
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['user', 'status', 'reference']

    def get_queryset(self):
         if not self.request.user.is_authenticated:
             return Order.objects.none()
         if self.request.user.role == 'ADMIN':
            return Order.objects.all()
         return Order.objects.filter(user=self.request.user)


    def perform_create(self, serializer):
        reference = f"ORD-{uuid.uuid4().hex[:8].upper()}"
        serializer.save(user=self.request.user, reference=reference, total_amount=0)

@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Store Order Items']))
@method_decorator(name='create', decorator=swagger_auto_schema(tags=['Store Order Items']))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=['Store Order Items']))
@method_decorator(name='update', decorator=swagger_auto_schema(tags=['Store Order Items']))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(tags=['Store Order Items']))
@method_decorator(name='destroy', decorator=swagger_auto_schema(tags=['Store Order Items']))
class OrderItemViewSet(viewsets.ModelViewSet):
    from .serializers import OrderItemSerializer
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'ADMIN':
            return OrderItem.objects.all()
        return OrderItem.objects.filter(order__user=self.request.user)

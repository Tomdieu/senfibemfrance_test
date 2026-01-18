from rest_framework import serializers
from .models import Product, Order, OrderItem, Cart, CartItem, SubscriptionPlan, UserSubscription

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class SubscriptionPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = '__all__'

class UserSubscriptionSerializer(serializers.ModelSerializer):
    plan_name = serializers.CharField(source='plan.name', read_only=True)

    class Meta:
        model = UserSubscription
        fields = '__all__'
        read_only_fields = ('user', 'start_date', 'end_date', 'is_active')

class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_price = serializers.DecimalField(source='product.price', max_digits=10, decimal_places=2, read_only=True)
    plan_name = serializers.CharField(source='subscription_plan.name', read_only=True)
    plan_price = serializers.DecimalField(source='subscription_plan.price', max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = CartItem
        fields = ('id', 'product', 'product_name', 'product_price', 'subscription_plan', 'plan_name', 'plan_price', 'quantity')

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ('id', 'items', 'total_price')

    def get_total_price(self, obj):
        total = 0
        for item in obj.items.all():
            if item.product:
                total += item.product.price * item.quantity
            elif item.subscription_plan:
                total += item.subscription_plan.price * item.quantity
        return total

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    plan_name = serializers.CharField(source='subscription_plan.name', read_only=True)

    class Meta:
        model = OrderItem
        fields = ('product', 'product_name', 'subscription_plan', 'plan_name', 'quantity', 'unit_price')

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ('user', 'reference', 'total_amount', 'commission_amount', 'status', 'created_at')

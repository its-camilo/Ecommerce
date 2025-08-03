import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Layout } from '../../../layouts';
import { styles } from './OrderScreen.styles';
import { useState, useEffect } from 'react';
import Toast from 'react-native-root-toast';
import { orderCtrl } from '../../../api';
import { formatPrice } from '../../../utils/functions/formatPrice';
import { ENV } from '../../../utils';
import { DateTime } from 'luxon';
import { LoadingScreen, Separator } from '../../../components/Shared';

export function OrderScreen(props) {
  const {
    route: { params },
  } = props;
  const orderId = params.id;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrder();
  }, [orderId]);

  const getOrder = async () => {
    try {
      setLoading(true);
      const response = await orderCtrl.getById(orderId);

      if (response === null) {
        Toast.show('Pedido no encontrado', {
          position: Toast.positions.CENTER,
        });
        return;
      }

      setOrder(response.data || response);
    } catch (error) {
      Toast.show('Error al obtener el pedido', {
        position: Toast.positions.CENTER,
      });
    } finally {
      setLoading(false);
    }
  };

  const formatOrderDate = dateString => {
    return DateTime.fromISO(dateString, {
      zone: 'America/Bogota',
    }).toFormat("dd/MM/yyyy 'a las' HH:mm");
  };

  if (loading) {
    return (
      <Layout.Basic textTitleCenter="Detalle del Pedido">
        <LoadingScreen text="Cargando información del pedido..." />
      </Layout.Basic>
    );
  }

  if (!order) {
    return (
      <Layout.Basic textTitleCenter="Detalle del Pedido">
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            No se pudo cargar la información del pedido
          </Text>
        </View>
      </Layout.Basic>
    );
  }

  return (
    <Layout.Basic textTitleCenter="Detalle del Pedido">
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Order Header */}
        <View style={styles.orderHeader}>
          <Text style={styles.orderId}>Pedido #{order.id}</Text>
          <Text style={styles.orderDate}>
            {formatOrderDate(order.createdAt)}
          </Text>
          <Text style={styles.paymentId}>ID de pago: {order.idPayment}</Text>
        </View>

        <Separator height={20} />

        {/* Products Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Productos</Text>
          {order.products?.map((product, index) => {
            return (
              <View key={index} style={styles.productItem}>
                <View style={styles.productInfo}>
                  <Text style={styles.productTitle} numberOfLines={2}>
                    {product.title}
                  </Text>
                  <Text style={styles.productQuantity}>
                    Cantidad: {product.quantity}
                  </Text>
                  <View style={styles.priceContainer}>
                    {product.discount > 0 && (
                      <Text style={styles.originalPrice}>
                        ${formatPrice(product.price)}
                      </Text>
                    )}
                    <Text style={styles.productPrice}>
                      $
                      {formatPrice(
                        product.price * (1 - (product.discount || 0) / 100)
                      )}
                    </Text>
                  </View>
                  <Text style={styles.subtotal}>
                    Subtotal: $
                    {formatPrice(
                      product.price *
                        (1 - (product.discount || 0) / 100) *
                        product.quantity
                    )}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <Separator height={20} />

        {/* Shipping Address Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dirección de Envío</Text>
          <View style={styles.addressContainer}>
            <Text style={styles.addressTitle}>
              {order.addressShipping?.title}
            </Text>
            <Text style={styles.addressName}>
              {order.addressShipping?.name}
            </Text>
            <Text style={styles.addressText}>
              {order.addressShipping?.address}
            </Text>
            <Text style={styles.addressText}>
              {order.addressShipping?.city}, {order.addressShipping?.state}
            </Text>
            <Text style={styles.addressText}>
              {order.addressShipping?.country} -{' '}
              {order.addressShipping?.zipCode ||
                order.addressShipping?.postal_code}
            </Text>
            <Text style={styles.addressPhone}>
              Teléfono: {order.addressShipping?.phone}
            </Text>
          </View>
        </View>

        <Separator height={20} />

        {/* Payment Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen de Pago</Text>
          <View style={styles.paymentSummary}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total Pagado:</Text>
              <Text style={styles.totalAmount}>
                ${formatPrice(Number(order.totalPayment))}
              </Text>
            </View>
          </View>
        </View>

        <Separator height={30} />
      </ScrollView>
    </Layout.Basic>
  );
}

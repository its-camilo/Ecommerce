import { View, Text } from 'react-native'
import {styles} from "./GridProducts.styles";
import {map} from "lodash";
import { Product } from './Product';

export function GridProducts(props) {
    const { title, products } = props;
    return (
        <View style={styles.container}>
            {title && <Text style={styles.title}>{title}</Text>}

            <View style={styles.gridContainer}>
                {map(products, (item) => {
                    const product = item;
                    product.id = item.id;
                    return <Product key={product.id} product={product}/>;
                })}
            </View>
        </View>
    );
}
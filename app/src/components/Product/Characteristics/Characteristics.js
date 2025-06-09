import { View, Text, StyleSheet } from 'react-native';

export function Characteristics(props) {
  const { text } = props;

  // Función para renderizar contenido de tipo Blocks de Strapi
  const renderBlocksContent = blocks => {
    if (!blocks || !Array.isArray(blocks)) {
      return (
        <Text style={styles.noDataText}>
          No hay características disponibles
        </Text>
      );
    }

    return blocks.map((block, index) => {
      if (block.type === 'paragraph' && block.children) {
        const textContent = block.children
          .map(child => child.text || '')
          .join('');
        return (
          <Text key={index} style={styles.paragraphText}>
            {textContent}
          </Text>
        );
      }

      // Manejo de otros tipos de bloques si es necesario
      if (block.type === 'heading' && block.children) {
        const textContent = block.children
          .map(child => child.text || '')
          .join('');
        return (
          <Text key={index} style={styles.headingText}>
            {textContent}
          </Text>
        );
      }

      return null;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Características</Text>
      <View style={styles.contentContainer}>{renderBlocksContent(text)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'left',
  },
  contentContainer: {
    paddingLeft: 8,
  },
  paragraphText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 8,
    textAlign: 'justify',
  },
  headingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginTop: 12,
    marginBottom: 8,
  },
  noDataText: {
    fontSize: 16,
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

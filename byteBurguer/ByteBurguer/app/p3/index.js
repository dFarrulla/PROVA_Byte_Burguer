import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const DetalhesScreen = ({ navigation }) => {
  // State variables
  const [quantidade, setQuantidade] = useState(1);
  const [selectedBebida, setSelectedBebida] = useState(null);
  const [produto, setProduto] = useState(null); // Changed to initialize as null
  const [bebidas, setBebidas] = useState([]); // Initialize as an empty array

  useEffect(() => {
    // Fetch hamburger (produto) details
    const produtoId = 2;
    if (produtoId) {
      const produtoUrl = `https://h18llwz6-3000.brs.devtunnels.ms/produtos/${produtoId}`;
      axios.get(produtoUrl)
        .then(response => {
          setProduto(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar informações do produto:', error);
        });
    }

    // Fetch list of beverages (bebidas)
    const bebidasUrl = 'https://h18llwz6-3000.brs.devtunnels.ms/produtos';
    axios.get(bebidasUrl)
      .then(response => {
        if (Array.isArray(response.data)) {
          // Filter the array to include only the first two beverages
          const filteredBebidas = response.data.slice(4, 6);
          setBebidas(filteredBebidas);
        } else {
          console.error('Erro: As informações das bebidas não são um array:', response.data);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar informações das bebidas:', error);
      });
  }, []);

  // Function to increment quantity
  const incrementarQuantidade = () => {
    setQuantidade(quantidade + 1);
  };

  // Function to decrement quantity
  const decrementarQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

  // Function to handle order confirmation
  const confirmarPedido = () => {
    // Lógica para confirmar o pedido
    // Pode ser implementada de acordo com as necessidades do seu aplicativo
  };

  return (
    <View style={styles.container}>
      {/* Barra Superior */}
      <View style={styles.header}>
        <Link href="/p1">
          <FontAwesome5 name="arrow-left" size={24} color="black" />
        </Link>
        <Text style={styles.headerText}>Detalhes</Text>
        <FontAwesome5 name="star" size={24} color="black" />
      </View>

      {/* Foto do Hambúrguer */}
      <Image
        source={require('../../images/x-burguer.jpg')}
        style={styles.hamburguerImage}
      />

      {/* Detalhes do Hambúrguer */}
      <View style={styles.hamburguerDetails}>
        {produto && (
          <View>
            <Text style={styles.hamburguerName}>{produto.nome}</Text>
            <Text style={styles.hamburguerPrice}>{`R$${produto.preco}`}</Text>
            <Text style={styles.hamburguerDescription}>{produto.descricao}</Text>
          </View>
        )}

        {/* Controle de Quantidade */}
        <View style={styles.quantityControl}>
          <TouchableOpacity onPress={decrementarQuantidade}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantidade}</Text>
          <TouchableOpacity onPress={incrementarQuantidade}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Picker para seleção de bebida */}
        <Picker
          selectedValue={selectedBebida ? selectedBebida.id : null}
          onValueChange={(value) => setSelectedBebida(bebidas.find((bebida) => bebida.id === value))}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma bebida" value={null} />
          {bebidas.map((bebida) => (
            <Picker.Item key={bebida.id} label={bebida.nome} value={bebida.id} />
          ))}
        </Picker>
      </View>

      {/* Botão Confirmar Pedido */}
      <TouchableOpacity style={styles.confirmButton} onPress={confirmarPedido}>
        <Text style={styles.confirmButtonText}>Confirmar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  hamburguerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  hamburguerDetails: {
    padding: 20,
  },
  hamburguerName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hamburguerPrice: {
    fontSize: 18,
    color: 'green',
    marginBottom: 10,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityButton: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  hamburguerDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: 'red',
    alignItems: 'center',
    padding: 15,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  picker: {
    marginTop: 10,
    marginBottom: 20,
  },
});

export default DetalhesScreen;

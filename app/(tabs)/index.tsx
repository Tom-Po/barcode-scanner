import {createContext, useState, ReactNode} from 'react'
import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { Code } from 'react-native-vision-camera';
type EAN13 = number

type ProductType = {
  id: number,
  ean13: EAN13,
  name: string
}
// TODO : Redux parce que les contextes voila
// un peu de style 
// un peu d'audace
// un peu de check sur la consomation de batterie aussi visiblement

// const CodeContext = createContext([]);

// const CodeProvider = (props: {children: ReactNode}) => {
//   const [codes, setCodes] = useState<Code[]>([]);

//   const addCode = (code: Code) => {
//     setCodes((prevCodes) => [...prevCodes, code]);
//   };
//   const codeContext = {
//     codesContext : codes,
//     addCode: (code: Code) => addCode(code)
//   }
//   return (
//     <CodeContext.Provider value={codeContext}>
//       {props.children}
//     </CodeContext.Provider>
//   );
// };

export default function TabOneScreen() {
  const products: ProductType[] = [{
    id: 0,
    ean13: 5430000384308,
    name: '1637 blond 40G'
  },
  {
    id: 1,
    ean13: 3535800003045,
    name: 'Crêpes Dentelle Chocolat au lait'
  }]
  return (
  //  <ProductContext.Provider value={initialData}>
     <View style={styles.container}>
      <Text style={styles.title}>Liste produits</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.productList}>
        <Text style={styles.title}>Liste des produits</Text>
        {products.map(p => (
          <Text key={"productkey-" + p.id} style={styles.productListItem}>{p.name} - {p.ean13}</Text>
        ))}
      </View>
    </View>
  //  </ProductContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  productList: {
    padding: 20
  },
  productListItem: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 3,
    paddingBottom: 3
  }
});

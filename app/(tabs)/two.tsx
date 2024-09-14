import { StyleSheet, Text } from 'react-native';
import { useState } from "react";
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner, Code } from "react-native-vision-camera";
import Barcode from "react-native-barcode-builder";
 
export default function CameraScreen() {
  const device = useCameraDevice('back')
  const [barcodes, setBarcodes] = useState<string[]>([])
  const { hasPermission, requestPermission } = useCameraPermission()
  let iteration = 0
  const codeScanner = useCodeScanner({
    codeTypes: ['ean-13'],
    onCodeScanned: (codes: Code[]) => {
      codes.forEach((c: Code) => {
        const {value} = c
        if(!value || value.length < 13 || barcodes.includes(value)) return
        console.log("EAN") 
        console.log(c.value)
        console.log(iteration)
        iteration++
        setBarcodes([...barcodes, value])
      })
    }
  })
  if (!hasPermission) {
    requestPermission()
    return <Text>Les permissions n'ont pas été accordées</Text>
  }
  if (device == null) return <Text>Aucune caméra disponible</Text>

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      codeScanner={codeScanner}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

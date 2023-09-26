import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Appbar } from 'react-native-paper'
import { styles } from './styles'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'
import ContentStep from './components/ContentStep'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const OrderPage = props => {
  const navigation = useNavigation()
  const { uuid, orderNumber } = props.route.params
  const [currentStep, setCurrentStep] = useState(0)

  const handleButton = () => {
    if (currentStep === 0) {
      setCurrentStep(1)
    } else {
      navigation.navigate('Home')
    }
  }

  return (
    <>
      <Appbar.Header
        mode="small"
        style={styles.header}
        theme={{ colors: { primary: 'green', secondary: 'red' } }}
      >
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          color="#F6F6F6"
        />
        <Appbar.Content
          title={`Pedido ${props.route.params.orderNumber}`}
          color="#F6F6F6"
          style={styles.headerText}
        />
      </Appbar.Header>
      <View style={styles.container}>
        <ProgressSteps
          completedProgressBarColor={'#F58328'}
          borderWidth={3}
          activeStep={currentStep}
          activeStepIconBorderColor={'#F58328'}
          progressBarColor={'#d7d7d7'}
          completedStepIconColor={'#F58328'}
          completedCheckColor={'#ffffff'}
          disabledStepIconColor={'#d7d7d7'}
          disabledStepNumColor={'#585858'}
        >
          <ProgressStep
            removeBtnRow={true}
            scrollable={false}
            style={styles.progressSteps}
          >
            <ContentStep currentStep={currentStep} />
          </ProgressStep>
          <ProgressStep removeBtnRow={true} scrollable={false}>
            <ContentStep currentStep={currentStep} />
          </ProgressStep>
        </ProgressSteps>
      </View>

      <TouchableOpacity style={styles.buttonDelivery} onPress={handleButton}>
        <View style={styles.circleButton}>
          {currentStep === 0 ? (
            <MaterialCommunityIcons
              name={'motorbike'}
              color={'#ffffff'}
              size={40}
            />
          ) : (
            <MaterialCommunityIcons
              name={'check-circle'}
              color={'#ffffff'}
              size={50}
            />
          )}
        </View>
        <View style={styles.containerButtonText}>
          <Text style={styles.buttonText}>
            {currentStep === 0 ? 'Cheguei' : 'Concluído'}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  )
}

export default OrderPage

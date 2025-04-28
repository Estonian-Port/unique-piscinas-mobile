import { View, Text } from 'react-native'
import React from 'react'
import { ScreenCard } from './ScreenCard'
import { HelpIcon } from '@/assets/icons'
import FAQItem from './faqItem'
import { faqsMock } from '@/data/mock/faqMock'

const PreguntasFrecuentes = () => {
    const faqs : FAQ[] = faqsMock

  return (
    <ScreenCard>
        <View className='flex-row items-center justify-start mb-3'>
            <HelpIcon />
            <Text className="font-geist-semi-bold text-2xl text-text ml-2">Preguntas Frecuentes</Text>
        </View>
        <Text className='font-geist-extraLight text-text text-base'>Información sobre el funcionamiento del sistema de filtración</Text>
        {faqs.map((faq, index) => (
          <FAQItem
            faq={faq}
            key={index} 
          />
        ))}
    </ScreenCard>
  )
}

export default PreguntasFrecuentes
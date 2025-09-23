import { View, Text } from 'react-native'
import React from 'react'
import { ScreenCard } from '../utiles/ScreenCard'
import FAQItem from './faqItem'
import { faqsMock } from '@/data/mock/faqMock'
import { HelpCircle } from 'react-native-feather'
import { FAQ } from '@/data/domain/faq'

const PreguntasFrecuentes = () => {
    const faqs : FAQ[] = faqsMock

  return (
    <ScreenCard>
        <View className='flex-row items-center justify-start mb-3'>
            <HelpCircle color={'#a59064'} />
            <Text className="font-geist-semi-bold text-2xl text-text ml-2">Preguntas Frecuentes</Text>
        </View>
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
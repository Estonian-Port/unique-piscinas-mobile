import { FAQ } from "@/data/domain/faq";
import { useState } from "react";
import { Pressable, View, Text } from "react-native";
import { ChevronDown, ChevronUp } from "react-native-feather";

 
const FAQItem = ({ faq }: {faq:FAQ}) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    return (
      <View className="border-b border-gray-200 py-3">
        <Pressable 
          className="flex-row justify-between items-center" 
          onPress={() => setIsExpanded(!isExpanded)}
        >
          <Text className="font-geist-semi-bold text-gold-unique text-lg flex-1 pr-2">
            {faq.question}
          </Text>
          {isExpanded ? 
            <ChevronUp height={20} width={20}  color="#333" /> : 
            <ChevronDown height={20} width={20}  color="#333" />
          }
        </Pressable>
        
        {isExpanded && (
          <View className="my-2 pl-2">
            <Text className="font-geist text-text text-base">
              {faq.answer}
            </Text>
          </View>
        )}
      </View>
    );
  };

  export default FAQItem;
import { ChevronDownIcon, ChevronUpIcon } from "@/assets/icons";
import { useState } from "react";
import { Pressable, View, Text } from "react-native";

 
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
            <ChevronUpIcon size={20} color="#333" /> : 
            <ChevronDownIcon size={20} color="#333" />
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
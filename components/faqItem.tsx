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
          <Text className="font-geist-semiBold text-text text-base flex-1 pr-2">
            {faq.question}
          </Text>
          {isExpanded ? 
            <ChevronUpIcon size={20} color="#333" /> : 
            <ChevronDownIcon size={20} color="#333" />
          }
        </Pressable>
        
        {isExpanded && (
          <View className="mt-2 pl-2">
            <Text className="font-geist text-text text-sm">
              {faq.answer}
            </Text>
          </View>
        )}
      </View>
    );
  };

  export default FAQItem;
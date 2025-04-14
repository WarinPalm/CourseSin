import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

type PaginationProps = {
  page: number;
  totalPage: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ page, totalPage, setPage, limit, setLimit }) => {
  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPage) setPage(page + 1);
  };

  return (
    <View className="mt-6 px-4 space-y-4">
      <View className='flex flex-row justify-between'>

        {/* Dropdown */}

        <View className="border border-gray-300 bg-gray-100 dark:bg-gray-800 dark:border-gray-600 rounded-lg w-[100px] h-10 justify-center ms-3">
          <Picker
            selectedValue={limit}
            onValueChange={(value) => {
              setLimit(value);
              setPage(1)
            }}
            mode="dropdown"

          >
            <Picker.Item label="5" value={5} />
            <Picker.Item label="10" value={10} />
            <Picker.Item label="15" value={15} />
            <Picker.Item label="20" value={20} />
          </Picker>
        </View>


        {/* ปุ่มเปลี่ยนหน้า */}
        <View className="flex-row justify-center items-center">
          <TouchableOpacity
            onPress={handlePrev}
            disabled={page === 1}
            className={`p-1 rounded-full shadow me-3 ${page === 1 ? 'bg-gray-300' : 'bg-violet-500'
              }`}
          >
            <Ionicons name="chevron-back" size={24} color="#ffffff" onPress={handlePrev}
              disabled={page === 1} />
          </TouchableOpacity>

          <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {page} / {totalPage}
          </Text>

          <TouchableOpacity
            onPress={handleNext}
            disabled={page === totalPage}
            className={`p-1 rounded-full shadow ms-3 ${page === totalPage ? 'bg-gray-300' : 'bg-violet-500'
              }`}
          >
            <Ionicons name="chevron-forward" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Pagination;

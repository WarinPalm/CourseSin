import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (perPage: number) => void;
  itemsPerPageOptions?: number[];
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 15, 20],
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <View className="flex-row justify-between items-center p-3">
      {/* Prev Button */}
      <TouchableOpacity onPress={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
        <Ionicons name="chevron-back" size={24} color={currentPage === 1 ? 'gray' : 'black'} />
      </TouchableOpacity>

      {/* Page Info */}
      <Text className="text-base">
        Page {currentPage} of {totalPages}
      </Text>

      {/* Next Button */}
      <TouchableOpacity onPress={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
        <Ionicons name="chevron-forward" size={24} color={currentPage === totalPages ? 'gray' : 'black'} />
      </TouchableOpacity>

      {/* Items per page */}
      <Picker
        selectedValue={itemsPerPage}
        style={{ width: 100 }}
        onValueChange={(value) => onItemsPerPageChange(value)}
      >
        {itemsPerPageOptions.map((option) => (
          <Picker.Item key={option} label={`${option}/page`} value={option} />
        ))}
      </Picker>
    </View>
  );
};

export default Pagination;

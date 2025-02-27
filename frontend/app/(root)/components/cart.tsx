import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import * as Icon from 'react-native-feather';

const Cart = () => {
    const [activeFav, setActiveFav] = useState<Boolean>(false);

    const handleFavPress = () => { setActiveFav(!activeFav);};
    let btnClass = activeFav ? 'bg-red-500' : 'bg-purple-700';

    return (
        <View className='absolute top-40 mt-10 w-full z-50 px-4'>
            <View className='flex-row items-center justify-end space-x-4'>
                <TouchableOpacity
                    onPress={handleFavPress}
                    className={`${btnClass} justify-center items-center rounded-full me-3 p-4 shadow-lg`}
                >
                    <Icon.Heart className='text-white' strokeWidth={2.5} stroke="white" width={24} height={24} />
                </TouchableOpacity>
            
            </View>
        </View>
    );
};

export default Cart;
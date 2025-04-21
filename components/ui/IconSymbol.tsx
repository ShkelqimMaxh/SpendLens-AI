// This file is a fallback for using MaterialIcons on Android and web.

import { MaterialIcons } from '@expo/vector-icons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

type SymbolName = 
  | 'house.fill' 
  | 'paperplane.fill' 
  | 'chevron.left.forwardslash.chevron.right' 
  | 'chevron.right'
  | 'arrow-forward' 
  | 'arrow-back' 
  | 'close' 
  | 'check' 
  | 'add';

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING: Record<SymbolName, keyof typeof MaterialIcons.glyphMap> = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'arrow-forward': 'arrow-forward',
  'arrow-back': 'arrow-back',
  'close': 'close',
  'check': 'check',
  'add': 'add'
};

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. 
 * This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color = '#000000',
  style,
  weight = 'regular'
}: {
  name: SymbolName;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}

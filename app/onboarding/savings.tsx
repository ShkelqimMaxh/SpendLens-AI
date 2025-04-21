import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONT, SPACING } from '../../constants/theme';
import { SavedFunds } from '../../types';

const FUND_TYPES = [
  { id: 'savings', label: 'Savings', icon: 'piggy-bank' },
  { id: 'investment', label: 'Investment', icon: 'chart-line' },
  { id: 'emergency', label: 'Emergency', icon: 'alert-circle' },
  { id: 'other', label: 'Other', icon: 'package-variant' }
] as const;

export default function SavingsSetup() {
  const router = useRouter();
  const [funds, setFunds] = useState<SavedFunds[]>([]);
  const [currentFund, setCurrentFund] = useState<Partial<SavedFunds>>({
    name: '',
    amount: 0,
    type: 'savings'
  });

  const handleAddFund = () => {
    if (!currentFund.name || !currentFund.amount) return;

    const newFund: SavedFunds = {
      id: Date.now().toString(),
      name: currentFund.name,
      amount: currentFund.amount,
      type: currentFund.type as SavedFunds['type']
    };

    setFunds([...funds, newFund]);
    setCurrentFund({
      name: '',
      amount: 0,
      type: 'savings'
    });
  };

  const handleDeleteFund = (id: string) => {
    setFunds(funds.filter(fund => fund.id !== id));
  };

  const handleNext = () => {
    // TODO: Save funds to storage
    router.push('/onboarding/spending');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Set Up Your Savings</Text>
        <Text style={styles.subtitle}>Add your existing savings and investments</Text>
        
        <Text style={styles.guidance}>
          Track different savings buckets like Emergency Funds, Investments, or Vacation goals. 
          This helps you organize and monitor your financial goals effectively.
        </Text>

        <View style={styles.formCard}>
          <TextInput
            style={styles.input}
            placeholder="Fund Name (e.g. Emergency Fund)"
            value={currentFund.name}
            onChangeText={(text) => setCurrentFund({ ...currentFund, name: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="numeric"
            value={currentFund.amount ? currentFund.amount.toString() : ''}
            onChangeText={(text) => setCurrentFund({ ...currentFund, amount: parseFloat(text) || 0 })}
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Fund Type</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {FUND_TYPES.map((type) => (
                <Pressable
                  key={type.id}
                  style={[
                    styles.chip,
                    currentFund.type === type.id && styles.chipSelected
                  ]}
                  onPress={() => setCurrentFund({ ...currentFund, type: type.id as SavedFunds['type'] })}
                >
                  <MaterialCommunityIcons 
                    name={type.icon} 
                    size={16} 
                    color={currentFund.type === type.id ? COLORS.text.white : COLORS.text.secondary} 
                  />
                  <Text style={[
                    styles.chipText,
                    currentFund.type === type.id && styles.chipTextSelected
                  ]}>{type.label}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddFund}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="plus" size={20} color={COLORS.text.secondary} />
            <Text style={styles.addButtonText}>Add Fund</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fundList}>
          {funds.length > 0 ? (
            funds.map((fund) => (
              <View key={fund.id} style={styles.fundItem}>
                <View style={styles.fundItemLeft}>
                  <MaterialCommunityIcons 
                    name={FUND_TYPES.find(t => t.id === fund.type)?.icon || 'cash'} 
                    size={24} 
                    color="#119DA4" 
                  />
                  <View>
                    <Text style={styles.fundName}>{fund.name}</Text>
                    <Text style={styles.fundDetails}>
                      {FUND_TYPES.find(t => t.id === fund.type)?.label}
                    </Text>
                  </View>
                </View>
                <View style={styles.fundItemRight}>
                  <Text style={styles.fundAmount}>${fund.amount}</Text>
                  <TouchableOpacity 
                    onPress={() => handleDeleteFund(fund.id)}
                    style={styles.deleteButton}
                  >
                    <MaterialCommunityIcons name="trash-can-outline" size={20} color={COLORS.text.secondary} />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="piggy-bank-outline" size={48} color={COLORS.text.tertiary} />
              <Text style={styles.emptyStateText}>Add your first savings fund</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>Next</Text>
          <Ionicons name="arrow-forward" size={24} color={COLORS.text.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  title: {
    ...FONT.bold,
    fontSize: FONT.sizes.xl,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...FONT.regular,
    fontSize: FONT.sizes.md,
    color: COLORS.text.secondary,
    marginBottom: SPACING.md,
  },
  guidance: {
    ...FONT.regular,
    fontSize: FONT.sizes.sm,
    color: COLORS.text.secondary,
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.md,
    borderRadius: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  formCard: {
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.lg,
    borderRadius: SPACING.md,
    gap: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    ...FONT.regular,
    fontSize: FONT.sizes.md,
    color: COLORS.text.primary,
    backgroundColor: COLORS.background.primary,
    padding: SPACING.md,
    borderRadius: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pickerContainer: {
    gap: SPACING.sm,
  },
  label: {
    ...FONT.medium,
    fontSize: FONT.sizes.sm,
    color: COLORS.text.secondary,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    backgroundColor: COLORS.background.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: SPACING.sm,
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipSelected: {
    backgroundColor: '#119DA4',
    borderColor: '#119DA4',
  },
  chipText: {
    ...FONT.medium,
    fontSize: FONT.sizes.sm,
    color: COLORS.text.secondary,
  },
  chipTextSelected: {
    color: COLORS.text.white,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background.primary,
    padding: SPACING.sm,
    borderRadius: SPACING.sm,
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  addButtonText: {
    ...FONT.medium,
    fontSize: FONT.sizes.sm,
    color: COLORS.text.secondary,
  },
  fundList: {
    marginTop: SPACING.lg,
    gap: SPACING.md,
  },
  fundItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.md,
    borderRadius: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  fundItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  fundItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  fundName: {
    ...FONT.medium,
    fontSize: FONT.sizes.md,
    color: COLORS.text.primary,
  },
  fundDetails: {
    ...FONT.regular,
    fontSize: FONT.sizes.sm,
    color: COLORS.text.secondary,
  },
  fundAmount: {
    ...FONT.semibold,
    fontSize: FONT.sizes.md,
    color: '#119DA4',
  },
  deleteButton: {
    padding: SPACING.xs,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.xl,
    borderRadius: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },
  emptyStateText: {
    ...FONT.medium,
    fontSize: FONT.sizes.md,
    color: COLORS.text.tertiary,
  },
  footer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.background.primary,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#119DA4',
    padding: SPACING.md,
    borderRadius: SPACING.sm,
    gap: SPACING.sm,
  },
  nextButtonText: {
    ...FONT.medium,
    fontSize: FONT.sizes.md,
    color: COLORS.text.white,
  },
}); 
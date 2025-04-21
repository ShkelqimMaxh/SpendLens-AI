import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { useState, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONT, SPACING } from '../../constants/theme';
import { Spending, SpendingType, RecurrenceType } from '../../types';

const SPENDING_TYPES = [
  { id: 'fixed' as SpendingType, label: 'Fixed', icon: 'calendar-month' },
  { id: 'variable' as SpendingType, label: 'Variable', icon: 'chart-line' },
  { id: 'discretionary' as SpendingType, label: 'Discretionary', icon: 'shopping-outline' }
];

const RECURRENCE_GROUPS = {
  'Short Term': [
    { id: 'weekly' as RecurrenceType, label: 'Weekly' },
    { id: 'biweekly' as RecurrenceType, label: 'Every 2 Weeks' },
    { id: 'monthly' as RecurrenceType, label: 'Monthly' }
  ],
  'Long Term': [
    { id: 'bimonthly' as RecurrenceType, label: 'Every 2 Months' },
    { id: 'quarterly' as RecurrenceType, label: 'Quarterly' },
    { id: 'semiannual' as RecurrenceType, label: 'Semi-Annual' },
    { id: 'annual' as RecurrenceType, label: 'Annual' },
    { id: 'biannual' as RecurrenceType, label: 'Every 2 Years' }
  ]
};

export default function SpendingSetup() {
  const router = useRouter();
  const [spendings, setSpendings] = useState<Spending[]>([]);
  const [currentSpending, setCurrentSpending] = useState<Partial<Spending>>({
    name: '',
    amount: 0,
    type: 'fixed',
    recurrence: 'monthly'
  });

  const totalMonthlySpending = useMemo(() => {
    return spendings.reduce((total, spending) => {
      let monthlyAmount = spending.amount;
      switch (spending.recurrence) {
        case 'weekly': monthlyAmount *= 4; break;
        case 'biweekly': monthlyAmount *= 2; break;
        case 'bimonthly': monthlyAmount *= 0.5; break;
        case 'quarterly': monthlyAmount *= 0.33; break;
        case 'semiannual': monthlyAmount *= 0.167; break;
        case 'annual': monthlyAmount *= 0.0833; break;
        case 'biannual': monthlyAmount *= 0.0417; break;
      }
      return total + monthlyAmount;
    }, 0);
  }, [spendings]);

  const handleAddSpending = () => {
    if (!currentSpending.name || !currentSpending.amount) return;

    const newSpending: Spending = {
      id: Date.now().toString(),
      name: currentSpending.name,
      amount: currentSpending.amount,
      type: currentSpending.type as SpendingType,
      recurrence: currentSpending.recurrence as RecurrenceType
    };

    setSpendings([...spendings, newSpending]);
    setCurrentSpending({
      name: '',
      amount: 0,
      type: 'fixed',
      recurrence: 'monthly'
    });
  };

  const handleDeleteSpending = (id: string) => {
    setSpendings(spendings.filter(spending => spending.id !== id));
  };

  const handleFinish = () => {
    // TODO: Save spendings to storage
    router.push('/(dashboard)');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Set Up Your Spending</Text>
            <Text style={styles.subtitle}>Add your recurring expenses</Text>
          </View>
          <View style={styles.progressIndicator}>
            <Text style={styles.progressText}>Step 3 of 3</Text>
          </View>
        </View>

        <Text style={styles.guidance}>
          Set recurring expenses so we can predict your cash flow more accurately.
          This helps us provide better financial insights and recommendations.
        </Text>

        <View style={styles.formCard}>
          <TextInput
            style={styles.input}
            placeholder="Expense Name (e.g. Rent)"
            value={currentSpending.name}
            onChangeText={(text) => setCurrentSpending({ ...currentSpending, name: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="numeric"
            value={currentSpending.amount ? currentSpending.amount.toString() : ''}
            onChangeText={(text) => setCurrentSpending({ ...currentSpending, amount: parseFloat(text) || 0 })}
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Expense Type</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {SPENDING_TYPES.map((type) => (
                <Pressable
                  key={type.id}
                  style={[
                    styles.chip,
                    currentSpending.type === type.id && styles.chipSelected
                  ]}
                  onPress={() => setCurrentSpending({ ...currentSpending, type: type.id })}
                >
                  <MaterialCommunityIcons 
                    name={type.icon} 
                    size={16} 
                    color={currentSpending.type === type.id ? COLORS.text.white : COLORS.text.secondary} 
                  />
                  <Text style={[
                    styles.chipText,
                    currentSpending.type === type.id && styles.chipTextSelected
                  ]}>{type.label}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Recurrence</Text>
            {Object.entries(RECURRENCE_GROUPS).map(([group, options]) => (
              <View key={group} style={styles.recurrenceGroup}>
                <Text style={styles.recurrenceGroupLabel}>{group}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {options.map((option) => (
                    <Pressable
                      key={option.id}
                      style={[
                        styles.chip,
                        currentSpending.recurrence === option.id && styles.chipSelected
                      ]}
                      onPress={() => setCurrentSpending({ ...currentSpending, recurrence: option.id })}
                    >
                      <Text style={[
                        styles.chipText,
                        currentSpending.recurrence === option.id && styles.chipTextSelected
                      ]}>{option.label}</Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            ))}
          </View>

          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddSpending}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="plus" size={20} color={COLORS.text.secondary} />
            <Text style={styles.addButtonText}>Add Expense</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.spendingList}>
          {spendings.length > 0 ? (
            <>
              <View style={styles.spendingSummary}>
                <Text style={styles.spendingSummaryText}>
                  Monthly Commitment: <Text style={styles.spendingSummaryAmount}>${totalMonthlySpending.toFixed(2)}</Text>
                </Text>
              </View>
              {spendings.map((spending) => (
                <View key={spending.id} style={styles.spendingItem}>
                  <View style={styles.spendingItemLeft}>
                    <MaterialCommunityIcons 
                      name={SPENDING_TYPES.find(t => t.id === spending.type)?.icon || 'cash'} 
                      size={24} 
                      color="#119DA4" 
                    />
                    <View>
                      <Text style={styles.spendingName}>{spending.name}</Text>
                      <Text style={styles.spendingDetails}>
                        {SPENDING_TYPES.find(t => t.id === spending.type)?.label} • 
                        {RECURRENCE_GROUPS['Short Term'].concat(RECURRENCE_GROUPS['Long Term'])
                          .find(r => r.id === spending.recurrence)?.label}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.spendingItemRight}>
                    <Text style={styles.spendingAmount}>${spending.amount}</Text>
                    <TouchableOpacity 
                      onPress={() => handleDeleteSpending(spending.id)}
                      style={styles.deleteButton}
                    >
                      <MaterialCommunityIcons name="trash-can-outline" size={20} color={COLORS.text.secondary} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </>
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="cash-multiple" size={48} color={COLORS.text.tertiary} />
              <Text style={styles.emptyStateText}>Add your first expense</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.finishButton}
          onPress={handleFinish}
          activeOpacity={0.8}
        >
          <Text style={styles.finishButtonText}>Finish Setup</Text>
          <MaterialCommunityIcons name="check" size={24} color={COLORS.text.white} />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
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
  },
  progressIndicator: {
    backgroundColor: COLORS.background.secondary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: SPACING.xs,
  },
  progressText: {
    ...FONT.medium,
    fontSize: FONT.sizes.sm,
    color: COLORS.text.secondary,
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
  recurrenceGroup: {
    gap: SPACING.xs,
  },
  recurrenceGroupLabel: {
    ...FONT.medium,
    fontSize: FONT.sizes.sm,
    color: COLORS.text.tertiary,
    marginLeft: SPACING.xs,
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
  spendingList: {
    marginTop: SPACING.lg,
    gap: SPACING.md,
  },
  spendingSummary: {
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.md,
    borderRadius: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  spendingSummaryText: {
    ...FONT.medium,
    fontSize: FONT.sizes.md,
    color: COLORS.text.secondary,
  },
  spendingSummaryAmount: {
    color: '#119DA4',
  },
  spendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.md,
    borderRadius: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  spendingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  spendingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  spendingName: {
    ...FONT.medium,
    fontSize: FONT.sizes.md,
    color: COLORS.text.primary,
  },
  spendingDetails: {
    ...FONT.regular,
    fontSize: FONT.sizes.sm,
    color: COLORS.text.secondary,
  },
  spendingAmount: {
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
  finishButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#119DA4',
    padding: SPACING.md,
    borderRadius: SPACING.sm,
    gap: SPACING.sm,
  },
  finishButtonText: {
    ...FONT.medium,
    fontSize: FONT.sizes.md,
    color: COLORS.text.white,
  },
}); 
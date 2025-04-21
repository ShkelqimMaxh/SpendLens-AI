import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONT, SPACING } from '../../constants/theme';
import { Income, IncomeType, RecurrenceType } from '../../types';

const INCOME_TYPES = [
  {
    type: 'salary',
    label: 'Salary',
    description: 'Regular income from employment',
    icon: 'briefcase-outline'
  },
  {
    type: 'freelance',
    label: 'Freelance',
    description: 'Income from contract or freelance work',
    icon: 'account-tie-outline'
  },
  {
    type: 'investment',
    label: 'Investment',
    description: 'Income from investments or dividends',
    icon: 'chart-line'
  },
  {
    type: 'business',
    label: 'Business',
    description: 'Income from business operations',
    icon: 'store-outline'
  },
  {
    type: 'other',
    label: 'Other',
    description: 'Other sources of income',
    icon: 'cash-multiple'
  },
] as const;

const RECURRENCE_INTERVALS = [1, 2, 3, 6, 12];
const RECURRENCE_BASES = ['week', 'month'] as const;

type RecurrenceInterval = {
  base: typeof RECURRENCE_BASES[number];
  interval: number;
};

export default function IncomeSetup() {
  const router = useRouter();
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [currentIncome, setCurrentIncome] = useState<Partial<Income>>({
    name: '',
    amount: 0,
    type: 'salary',
    recurrence: 'monthly'
  });
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [showIntervalSelector, setShowIntervalSelector] = useState(false);
  const [showBaseSelector, setShowBaseSelector] = useState(false);
  const [recurrenceSelector, setRecurrenceSelector] = useState<RecurrenceInterval>({
    base: 'month',
    interval: 1
  });

  const handleAddIncome = () => {
    if (!currentIncome.name || !currentIncome.amount) return;

    const newIncome: Income = {
      id: Date.now().toString(),
      name: currentIncome.name,
      amount: currentIncome.amount,
      type: currentIncome.type as IncomeType,
      recurrence: currentIncome.recurrence as RecurrenceType
    };

    setIncomes([...incomes, newIncome]);
    setCurrentIncome({
      name: '',
      amount: 0,
      type: 'salary',
      recurrence: 'monthly'
    });
  };

  const handleNext = () => {
    // TODO: Save incomes to storage
    router.push('/onboarding/savings');
  };

  const getRecurrenceLabel = (base: typeof RECURRENCE_BASES[number], interval: number): RecurrenceType => {
    if (base === 'month') {
      switch (interval) {
        case 1: return 'monthly';
        case 2: return 'bimonthly';
        case 3: return 'quarterly';
        case 6: return 'semiannual';
        case 12: return 'annual';
        default: return 'monthly';
      }
    } else if (base === 'week') {
      switch (interval) {
        case 1: return 'weekly';
        case 2: return 'biweekly';
        default: return 'weekly';
      }
    }
    return 'monthly';
  };

  const getRecurrenceDisplay = (recurrenceType: RecurrenceType): string => {
    const displayMap: Record<RecurrenceType, string> = {
      'weekly': 'Weekly',
      'biweekly': 'Every 2 weeks',
      'monthly': 'Monthly',
      'bimonthly': 'Every 2 months',
      'quarterly': 'Every 3 months',
      'semiannual': 'Every 6 months',
      'annual': 'Yearly',
      'biannual': 'Every 2 years'
    };
    return displayMap[recurrenceType];
  };

  const selectedType = INCOME_TYPES.find(t => t.type === currentIncome.type);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Set Up Your Income</Text>
        <Text style={styles.subtitle}>Add your income sources</Text>

        <View style={styles.form}>
          <View style={styles.formGroup}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                <MaterialCommunityIcons name="briefcase-outline" size={16} color={COLORS.text.secondary} />
                {' '}Income Name
              </Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Main Job, Side Gig"
                placeholderTextColor={COLORS.text.tertiary}
                value={currentIncome.name}
                onChangeText={(text) => setCurrentIncome({ ...currentIncome, name: text })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                <MaterialCommunityIcons name="cash-multiple" size={16} color={COLORS.text.secondary} />
                {' '}Amount
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter amount"
                placeholderTextColor={COLORS.text.tertiary}
                keyboardType="numeric"
                value={currentIncome.amount ? currentIncome.amount.toString() : ''}
                onChangeText={(text) => setCurrentIncome({ ...currentIncome, amount: parseFloat(text) || 0 })}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                <MaterialCommunityIcons name="format-list-checks" size={16} color={COLORS.text.secondary} />
                {' '}Income Type
              </Text>
              <Pressable
                style={[styles.selector, showTypeSelector && styles.selectorActive]}
                onPress={() => setShowTypeSelector(!showTypeSelector)}
              >
                <View style={styles.selectorContent}>
                  <MaterialCommunityIcons 
                    name={selectedType?.icon || 'briefcase-outline'} 
                    size={20} 
                    color={COLORS.text.primary} 
                  />
                  <Text style={styles.selectorText}>
                    {selectedType?.label || 'Select Type'}
                  </Text>
                </View>
                <Ionicons 
                  name={showTypeSelector ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color={COLORS.text.secondary} 
                />
              </Pressable>
              {showTypeSelector && (
                <View style={styles.dropdownMenu}>
                  {INCOME_TYPES.map((type) => (
                    <Pressable
                      key={type.type}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setCurrentIncome({ ...currentIncome, type: type.type });
                        setShowTypeSelector(false);
                      }}
                    >
                      <View style={styles.dropdownItemContent}>
                        <MaterialCommunityIcons name={type.icon} size={20} color={COLORS.text.primary} />
                        <View style={styles.dropdownItemText}>
                          <Text style={styles.dropdownItemLabel}>{type.label}</Text>
                          <Text style={styles.dropdownItemDescription}>{type.description}</Text>
                        </View>
                      </View>
                      {currentIncome.type === type.type && (
                        <Ionicons name="checkmark" size={20} color="#119DA4" />
                      )}
                    </Pressable>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                <MaterialCommunityIcons name="calendar-clock" size={16} color={COLORS.text.secondary} />
                {' '}Recurrence
              </Text>
              <View style={styles.recurrenceContainer}>
                <View style={styles.recurrenceRow}>
                  <Text style={styles.recurrenceLabel}>Every</Text>
                  <Pressable
                    style={[styles.recurrenceSelector, showIntervalSelector && styles.selectorActive]}
                    onPress={() => setShowIntervalSelector(!showIntervalSelector)}
                  >
                    <Text style={styles.selectorText}>{recurrenceSelector.interval}</Text>
                    <Ionicons 
                      name={showIntervalSelector ? "chevron-up" : "chevron-down"} 
                      size={20} 
                      color={COLORS.text.secondary} 
                    />
                  </Pressable>
                  <Pressable
                    style={[styles.recurrenceSelector, showBaseSelector && styles.selectorActive]}
                    onPress={() => setShowBaseSelector(!showBaseSelector)}
                  >
                    <Text style={styles.selectorText}>{recurrenceSelector.base}(s)</Text>
                    <Ionicons 
                      name={showBaseSelector ? "chevron-up" : "chevron-down"} 
                      size={20} 
                      color={COLORS.text.secondary} 
                    />
                  </Pressable>
                </View>

                {showIntervalSelector && (
                  <View style={[styles.dropdownMenu, styles.recurrenceDropdownMenu]}>
                    {RECURRENCE_INTERVALS.map((interval) => (
                      <Pressable
                        key={interval}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setRecurrenceSelector({ ...recurrenceSelector, interval });
                          setShowIntervalSelector(false);
                          const newRecurrence = getRecurrenceLabel(recurrenceSelector.base, interval);
                          setCurrentIncome({ 
                            ...currentIncome, 
                            recurrence: newRecurrence
                          });
                        }}
                      >
                        <Text style={[
                          styles.dropdownItemLabel,
                          recurrenceSelector.interval === interval && styles.dropdownItemSelected
                        ]}>{interval}</Text>
                        {recurrenceSelector.interval === interval && (
                          <Ionicons name="checkmark" size={20} color="#119DA4" />
                        )}
                      </Pressable>
                    ))}
                  </View>
                )}

                {showBaseSelector && (
                  <View style={[styles.dropdownMenu, styles.recurrenceDropdownMenu]}>
                    {RECURRENCE_BASES.map((base) => (
                      <Pressable
                        key={base}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setRecurrenceSelector({ ...recurrenceSelector, base });
                          setShowBaseSelector(false);
                          const newRecurrence = getRecurrenceLabel(base, recurrenceSelector.interval);
                          setCurrentIncome({ 
                            ...currentIncome, 
                            recurrence: newRecurrence
                          });
                        }}
                      >
                        <Text style={[
                          styles.dropdownItemLabel,
                          recurrenceSelector.base === base && styles.dropdownItemSelected
                        ]}>{base}(s)</Text>
                        {recurrenceSelector.base === base && (
                          <Ionicons name="checkmark" size={20} color="#119DA4" />
                        )}
                      </Pressable>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddIncome}
        >
          <MaterialCommunityIcons name="plus" size={20} color={COLORS.text.secondary} />
          <Text style={styles.addButtonText}>Add another income source</Text>
        </TouchableOpacity>

        {incomes.length > 0 && (
          <View style={styles.incomeList}>
            {incomes.map((income) => (
              <View key={income.id} style={styles.incomeItem}>
                <View style={styles.incomeItemHeader}>
                  <MaterialCommunityIcons 
                    name={INCOME_TYPES.find(t => t.type === income.type)?.icon || 'cash'} 
                    size={20} 
                    color="#119DA4" 
                  />
                  <Text style={styles.incomeItemName}>{income.name}</Text>
                </View>
                <Text style={styles.incomeItemAmount}>${income.amount}</Text>
                <Text style={styles.incomeItemRecurrence}>{getRecurrenceDisplay(income.recurrence)}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Continue</Text>
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
    marginBottom: SPACING.xl,
  },
  form: {
    gap: SPACING.xl,
  },
  formGroup: {
    gap: SPACING.md,
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.md,
    borderRadius: 12,
  },
  inputContainer: {
    gap: SPACING.xs,
  },
  label: {
    ...FONT.medium,
    fontSize: FONT.sizes.sm,
    color: COLORS.text.secondary,
    marginBottom: 2,
  },
  input: {
    ...FONT.regular,
    fontSize: FONT.sizes.md,
    color: COLORS.text.primary,
    backgroundColor: COLORS.background.primary,
    borderRadius: 8,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background.primary,
    borderRadius: 8,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectorActive: {
    borderColor: '#119DA4',
  },
  selectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  selectorText: {
    ...FONT.regular,
    fontSize: FONT.sizes.md,
    color: COLORS.text.primary,
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: COLORS.background.primary,
    borderRadius: 8,
    marginTop: SPACING.xs,
    padding: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
    zIndex: 1000,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderRadius: 6,
  },
  dropdownItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    flex: 1,
  },
  dropdownItemText: {
    flex: 1,
  },
  dropdownItemLabel: {
    ...FONT.medium,
    fontSize: FONT.sizes.md,
    color: COLORS.text.primary,
  },
  dropdownItemDescription: {
    ...FONT.regular,
    fontSize: FONT.sizes.sm,
    color: COLORS.text.secondary,
  },
  dropdownItemSelected: {
    color: '#119DA4',
  },
  recurrenceContainer: {
    position: 'relative',
  },
  recurrenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  recurrenceLabel: {
    ...FONT.regular,
    fontSize: FONT.sizes.md,
    color: COLORS.text.secondary,
  },
  recurrenceSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background.primary,
    borderRadius: 8,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    minWidth: 80,
  },
  recurrenceDropdownMenu: {
    width: 120,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.lg,
  },
  addButtonText: {
    ...FONT.medium,
    fontSize: FONT.sizes.md,
    color: COLORS.text.secondary,
  },
  incomeList: {
    gap: SPACING.md,
    marginTop: SPACING.md,
  },
  incomeItem: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    padding: SPACING.md,
  },
  incomeItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  incomeItemName: {
    ...FONT.medium,
    fontSize: FONT.sizes.md,
    color: COLORS.text.primary,
  },
  incomeItemAmount: {
    ...FONT.bold,
    fontSize: FONT.sizes.lg,
    color: '#119DA4',
    marginBottom: SPACING.xs,
  },
  incomeItemRecurrence: {
    ...FONT.regular,
    fontSize: FONT.sizes.sm,
    color: COLORS.text.secondary,
    textTransform: 'capitalize',
  },
  footer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.background.primary,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  nextButton: {
    backgroundColor: '#119DA4',
    borderRadius: 12,
    padding: SPACING.lg,
    alignItems: 'center',
  },
  nextButtonText: {
    ...FONT.medium,
    fontSize: FONT.sizes.md,
    color: COLORS.text.white,
  },
}); 
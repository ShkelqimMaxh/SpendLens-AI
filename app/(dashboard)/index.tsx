import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT, SPACING } from '../../constants/theme';

// Add type for icon names
type IconName = React.ComponentProps<typeof Ionicons>['name'];

// Update interfaces with correct icon type
interface SpendingItem {
  id: string;
  name: string;
  amount: number;
  date: string;
  icon: IconName;
}

interface TopSpendingItem {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  icon: IconName;
}

export default function Dashboard() {
  const router = useRouter();

  // Temporary data
  const balance = {
    income: 4200,
    spending: 3100,
    savings: 1000,
  };

  const recentSpendings: SpendingItem[] = [
    { id: '1', name: 'Housing', amount: 800, date: '2023-09-15', icon: 'home-outline' as IconName },
    { id: '2', name: 'Food', amount: 600, date: '2023-09-14', icon: 'restaurant-outline' as IconName },
    { id: '3', name: 'Transportation', amount: 400, date: '2023-09-09', icon: 'car-outline' as IconName },
  ];

  const topSpendings: TopSpendingItem[] = [
    { id: '1', name: 'Housing', amount: 800, percentage: 20, icon: 'home-outline' as IconName },
    { id: '2', name: 'Food', amount: 600, percentage: 20, icon: 'restaurant-outline' as IconName },
    { id: '3', name: 'Transportation', amount: 400, percentage: 13, icon: 'car-outline' as IconName },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <Text style={styles.balanceTitle}>Monthly Overview</Text>
          <Text style={styles.balanceAmount}>
            ${(balance.income - balance.spending).toLocaleString()}
          </Text>
          <Text style={styles.balanceSubtitle}>Available Balance</Text>
        </View>

        <View style={styles.balanceDetails}>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceItemLabel}>Income</Text>
            <Text style={styles.balanceItemAmount}>${balance.income.toLocaleString()}</Text>
          </View>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceItemLabel}>Spending</Text>
            <Text style={styles.balanceItemAmount}>${balance.spending.toLocaleString()}</Text>
          </View>
          <View style={[styles.balanceItem, styles.balanceItemSecondary]}>
            <Text style={styles.balanceItemLabel}>Savings</Text>
            <Text style={styles.balanceItemAmountSecondary}>${balance.savings.toLocaleString()}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Spending</Text>
          <Pressable onPress={() => {}}>
            <Text style={styles.sectionLink}>See All</Text>
          </Pressable>
        </View>
        {recentSpendings.map((item) => (
          <View key={item.id} style={styles.spendingItem}>
            <View style={styles.spendingLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name={item.icon} size={20} color="#2F6F6F" />
              </View>
              <View style={styles.spendingInfo}>
                <Text style={styles.spendingName}>{item.name}</Text>
                <Text style={styles.spendingDate}>{item.date}</Text>
              </View>
            </View>
            <Text style={styles.spendingAmount}>-${item.amount.toLocaleString()}</Text>
          </View>
        ))}
      </View>

      {topSpendings.length > 1 ? (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Spending Categories</Text>
            <Pressable onPress={() => {}}>
              <Text style={styles.sectionLink}>Details</Text>
            </Pressable>
          </View>
          {topSpendings.map((item) => (
            <View key={item.id} style={styles.spendingItem}>
              <View style={styles.spendingLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name={item.icon} size={20} color="#2F6F6F" />
                </View>
                <View style={styles.spendingInfo}>
                  <Text style={styles.spendingName}>{item.name}</Text>
                  <Text style={styles.spendingPercentage}>{item.percentage}% of total</Text>
                </View>
              </View>
              <Text style={styles.spendingAmount}>${item.amount.toLocaleString()}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Spending Categories</Text>
          </View>
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>More data coming soon</Text>
            <Text style={styles.placeholderSubtext}>Track your spending to see insights</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  balanceCard: {
    margin: SPACING.lg,
    borderRadius: 24,
    backgroundColor: '#2F6F6F',
    overflow: 'hidden',
  },
  balanceHeader: {
    padding: SPACING.xl,
    paddingBottom: SPACING.xl * 1.5,
  },
  balanceTitle: {
    ...FONT.medium,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: SPACING.sm,
  },
  balanceAmount: {
    ...FONT.bold,
    fontSize: 42,
    color: '#FFFFFF',
    marginVertical: SPACING.lg,
  },
  balanceSubtitle: {
    ...FONT.regular,
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  balanceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
  },
  balanceItem: {
    alignItems: 'center',
    flex: 1,
  },
  balanceItemSecondary: {
    opacity: 0.85,
  },
  balanceItemLabel: {
    ...FONT.regular,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.75)',
    marginBottom: SPACING.xs,
  },
  balanceItemAmount: {
    ...FONT.semibold,
    fontSize: 18,
    color: '#FFFFFF',
  },
  balanceItemAmountSecondary: {
    ...FONT.medium,
    fontSize: 18,
    color: '#FFFFFF',
  },
  section: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.xs,
  },
  sectionTitle: {
    ...FONT.semibold,
    fontSize: 20,
    color: '#1a1a1a',
  },
  sectionLink: {
    ...FONT.medium,
    fontSize: 14,
    color: '#2F6F6F',
  },
  spendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: SPACING.lg,
    marginBottom: SPACING.sm,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  spendingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(47, 111, 111, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  spendingInfo: {
    flex: 1,
  },
  spendingName: {
    ...FONT.medium,
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 2,
  },
  spendingDate: {
    ...FONT.regular,
    fontSize: 13,
    color: '#666666',
  },
  spendingPercentage: {
    ...FONT.regular,
    fontSize: 13,
    color: '#666666',
  },
  spendingAmount: {
    ...FONT.semibold,
    fontSize: 16,
    color: '#1a1a1a',
    minWidth: 80,
    textAlign: 'right',
  },
  placeholderContainer: {
    backgroundColor: '#FFFFFF',
    padding: SPACING.xl,
    borderRadius: 16,
    alignItems: 'center',
  },
  placeholderText: {
    ...FONT.medium,
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: SPACING.xs,
  },
  placeholderSubtext: {
    ...FONT.regular,
    fontSize: 14,
    color: '#666666',
  },
}); 
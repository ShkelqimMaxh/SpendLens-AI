import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONT, SPACING } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(17, 157, 164, 0.1)', 'rgba(255, 255, 255, 0)']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <MaterialCommunityIcons name="chart-timeline-variant" size={32} color="#119DA4" />
            </View>
            <View style={styles.brandContainer}>
              <Text style={styles.brandName}>SpendLens AI</Text>
              <Text style={styles.brandTagline}>Smart financial decisions</Text>
            </View>
          </View>
        </View>

        <View style={styles.mainContent}>
          <Text style={styles.headline}>Your Money, Smarter.</Text>
          <Text style={styles.description}>
            SpendLens AI helps you track spending and make better financial decisions—automatically. 
            Get personalized insights powered by AI to reach your financial goals faster.
          </Text>

          <View style={styles.features}>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="brain" size={24} color="#119DA4" />
              <Text style={styles.featureText}>AI-Powered Insights</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="chart-areaspline" size={24} color="#119DA4" />
              <Text style={styles.featureText}>Smart Spending Analysis</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="target" size={24} color="#119DA4" />
              <Text style={styles.featureText}>Personalized Goals</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/onboarding/income')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Let's Personalize Your Plan</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color={COLORS.text.white} />
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
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '50%',
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  header: {
    marginTop: SPACING.xl * 2,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  logoCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(17, 157, 164, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandContainer: {
    gap: SPACING.xs,
  },
  brandName: {
    ...FONT.bold,
    fontSize: FONT.sizes.lg,
    color: COLORS.text.primary,
  },
  brandTagline: {
    ...FONT.medium,
    fontSize: FONT.sizes.sm,
    color: COLORS.text.secondary,
  },
  mainContent: {
    marginTop: SPACING.xl * 3,
    gap: SPACING.xl,
  },
  headline: {
    ...FONT.bold,
    fontSize: FONT.sizes.xxl,
    color: COLORS.text.primary,
    lineHeight: FONT.sizes.xxl * 1.2,
  },
  description: {
    ...FONT.regular,
    fontSize: FONT.sizes.md,
    color: COLORS.text.secondary,
    lineHeight: FONT.sizes.md * 1.5,
  },
  features: {
    marginTop: SPACING.xl,
    gap: SPACING.lg,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.md,
    borderRadius: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  featureText: {
    ...FONT.medium,
    fontSize: FONT.sizes.md,
    color: COLORS.text.primary,
  },
  footer: {
    padding: SPACING.lg,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#119DA4',
    padding: SPACING.lg,
    borderRadius: SPACING.sm,
    gap: SPACING.sm,
  },
  buttonText: {
    ...FONT.medium,
    fontSize: FONT.sizes.md,
    color: COLORS.text.white,
  },
}); 
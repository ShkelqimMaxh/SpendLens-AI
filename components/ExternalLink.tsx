import { Link } from 'expo-router';
import { Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

interface ExternalLinkProps {
  href: string;
  [key: string]: any;
}

export function ExternalLink({ href, ...rest }: ExternalLinkProps) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href as any} // Type assertion needed for external URLs
      onPress={async (event) => {
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          await WebBrowser.openBrowserAsync(href);
        }
      }}
    />
  );
}

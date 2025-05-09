import { Stack } from "expo-router";
import './globals.css';

// R E T U R N

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}></Stack>
  );
}
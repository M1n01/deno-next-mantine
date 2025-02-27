"use client";
import { useEffect, useState } from "react";
import { Dino } from "./types";
import { 
  Title, 
  Text, 
  Container, 
  Paper, 
  List, 
  ThemeIcon, 
  Anchor,
  Stack,
  Skeleton,
  rem
} from '@mantine/core';
import { IconDna } from '@tabler/icons-react';
import Link from "next/link";

export default function Home() {
  const [dinosaurs, setDinosaurs] = useState<Dino[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/dinosaurs`);
        const allDinosaurs = await response.json() as Dino[];
        setDinosaurs(allDinosaurs);
      } catch (error) {
        console.error('Error fetching dinosaurs:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Container size="md" py="xl">
      <Paper radius="md" withBorder p="xl" mb="xl">
        <Title order={1} ta="center" mb="md">恐竜アプリへようこそ</Title>
        <Text c="dimmed" ta="center" mb="xl">
          詳細を見るには、下のリストから恐竜をクリックしてください。
        </Text>
        
        {loading ? (
          <Stack>
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} height={30} radius="md" />
            ))}
          </Stack>
        ) : (
          <List 
            spacing="sm"
            size="lg"
            center
            icon={
              <ThemeIcon color="blue" size={24} radius="xl">
                <IconDna style={{ width: rem(16), height: rem(16) }} />
              </ThemeIcon>
            }
          >
            {dinosaurs.map((dinosaur: Dino) => (
              <List.Item key={dinosaur.name}>
                <Anchor component={Link} href={`/${dinosaur.name.toLowerCase()}`}>
                  {dinosaur.name}
                </Anchor>
              </List.Item>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
}

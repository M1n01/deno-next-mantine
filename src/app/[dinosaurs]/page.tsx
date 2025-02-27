import { Suspense } from "react";
import { 
  Title, 
  Text, 
  Container, 
  Paper, 
  Button,
  Skeleton,
  Group,
  Divider
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from "next/link";
import { Dino } from "../types";

async function getDinosaur(name: string): Promise<Dino> {
  const resp = await fetch(`http://localhost:3000/api/dinosaurs/${name}`);
  if (!resp.ok) {
    throw new Error('Failed to fetch dinosaur');
  }
  return resp.json();
}

export default async function Page({
  params,
}: {
  params: Promise<{ dinosaurs: string }>
}) {
  const dinosaurName = (await params).dinosaurs;
  const dinosaur = await getDinosaur(dinosaurName);

  return (
    <Container size="md" py="xl">
      <Paper radius="md" withBorder p="xl">
        <Suspense fallback={
          <>
            <Skeleton height={50} width="70%" radius="md" mb="xl" />
            <Skeleton height={20} radius="md" mb="sm" />
            <Skeleton height={20} radius="md" mb="sm" />
            <Skeleton height={20} width="80%" radius="md" mb="xl" />
          </>
        }>
          <>
            <Title order={1} mb="md">{dinosaur.name}</Title>
            <Divider my="md" />
            <Text size="lg" mb="xl">
              {dinosaur.description}
            </Text>
          </>
        </Suspense>
        
        <Group justify="flex-start">
          <Button 
            component={Link} 
            href="/" 
            variant="outline" 
            leftSection={<IconArrowLeft size={14} />}
          >
            恐竜リストに戻る
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}

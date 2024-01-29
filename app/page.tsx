import ECommerce from '@/components/Dashboard/E-commerce';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HealtyTool',
  description: 'This is Home for HealtyTool',
  // other metadata
};

export default function Home() {
  return (
    <>
      <ECommerce />
    </>
  );
}

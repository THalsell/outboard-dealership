import RegisterForm from '@/components/auth/RegisterForm';

export const metadata = {
  title: 'Create Account | Clay Powersports',
  description: 'Create your Clay Powersports account to track orders, save favorites, and access exclusive deals.',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <RegisterForm />
    </div>
  );
}
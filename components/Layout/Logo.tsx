import Image from 'next/image';
export const Logo = () => {
  return (
    <div className="app-image">
      <Image src="/images/logo-linear.svg" alt="Amplify Hope" layout="fill" />
    </div>
  );
};

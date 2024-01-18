import Link from 'next/link';
import Image from 'next/image';

const PromotionalBanner = ({ banner }) => {
  const bannerLink = banner[0]?.link ? banner[0]?.link : '';
  const bannerImage = banner[0]?.img ? banner[0]?.img : ''

  return (
    <Link href={bannerLink} passHref>
      <div className="w-full h-[170px] max-h-[170px] rounded-xl bg-gray-300 max-w-[100%] overflow-hidden relative">
        <Image
          src={bannerImage}
          layout="fill"
          objectFit="cover"
          alt="banner promocional"
        />
      </div>
    </Link>
  );
};

export default PromotionalBanner;

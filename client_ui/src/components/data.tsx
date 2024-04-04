import {
  ChartBarSquareIcon,
  ChatBubbleLeftRightIcon,
  CursorArrowRaysIcon,
  FaceSmileIcon,
  Square3Stack3DIcon,
  SunIcon,
} from '@heroicons/react/20/solid';

import benefitOneImg from '../../public/img/benefit-one.png';
import benefitTwoImg from '../../public/img/benefit-two.png';

interface Benefit {
  title: string;
  desc: string;
  image: any;
  bullets: Bullet[];
}

interface Bullet {
  title: string;
  desc: string;
  icon: JSX.Element;
}

export const benefits = [
  {
    title: 'Highlight your brand',
    desc: 'Elevate your advantages. Our services amplify your brand\'s visibility, engage customers effectively, and drive tangible results, maximizing your success in the market.',
    image: benefitOneImg,
    bullets: [
      {
        title: 'Designing your brand',
        desc: 'Create a unique and compelling brand identity.',
        icon: <FaceSmileIcon className="w-7 h-7 text-indigo-50" />,
      },
      {
        title: 'Creating your content',
        desc: 'Develop engaging and impactful content for your brand.',
        icon: <ChartBarSquareIcon className="w-7 h-7 text-indigo-50" />,
      },
      {
        title: 'Marketing your business',
        desc: 'Promote your brand across various platforms and channels.',
        icon: <CursorArrowRaysIcon className="w-7 h-7 text-indigo-50" />,
      },
    ],
  },
  {
    title: 'More benefits to come',
    desc: 'Effortlessly manage your media and marketing content. Our platform streamlines content management, allowing easy customization and distribution of your messaging, all from one convenient dashboard',
    image: benefitTwoImg,
    bullets: [
      {
        title: 'Managing your resources',
        desc: 'Effortlessly manage your media and marketing content.',
        icon: <Square3Stack3DIcon className="w-7 h-7 text-indigo-50" />,
      },
      {
        title: 'Connecting to your customers',
        desc: 'Easily customize and distribute your messaging.',
        icon: <ChatBubbleLeftRightIcon className="w-7 h-7 text-indigo-50" />,
      },
      {
        title: 'Customizing your dashboard',
        desc: 'All from one convenient dashboard.',
        icon: <SunIcon className="w-7 h-7 text-indigo-50" />,
      },
    ],
  },
];
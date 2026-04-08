export interface Provider {
  id: string;
  name: string;
  category: string;
  rating: number;
  experience: string;
  bio: string;
  profileImage: string;
  price: string;
}

export const CATEGORIES = ['All', 'Doctor', 'Dentist', 'Salon', 'Fitness', 'Legal'];

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: '1',
    name: 'Dr. Sarah Jenkins',
    category: 'Doctor',
    rating: 4.8,
    experience: '12 years',
    bio: 'Board-certified general practitioner specializing in family medicine. Dr. Jenkins believes in holistic care and preventative medicine.',
    profileImage: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    price: '$120/hr',
  },
  {
    id: '2',
    name: 'Dr. Mark Thorne',
    category: 'Dentist',
    rating: 4.9,
    experience: '8 years',
    bio: 'Expert in cosmetic and restorative dentistry. Providing painless treatments to bring out your best smile.',
    profileImage: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    price: '$90/hr',
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    category: 'Salon',
    rating: 4.7,
    experience: '5 years',
    bio: 'Master stylist and color specialist. Elena keeps up with the latest trends to give you a modern, fresh look.',
    profileImage: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    price: '$65/hr',
  },
  {
    id: '4',
    name: 'Marcus Bell',
    category: 'Fitness',
    rating: 4.9,
    experience: '10 years',
    bio: 'Certified personal trainer and nutritionist focusing on functional strength training and sustainable weight loss.',
    profileImage: 'https://i.pravatar.cc/150?u=a04258a2462d826712d',
    price: '$50/hr',
  },
  {
    id: '5',
    name: 'Amanda Lin, Esq.',
    category: 'Legal',
    rating: 4.6,
    experience: '15 years',
    bio: 'Corporate and intellectual property lawyer. Helping small businesses and startups protect their assets.',
    profileImage: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
    price: '$200/hr',
  },
  {
    id: '6',
    name: 'Dr. James Wilson',
    category: 'Doctor',
    rating: 4.5,
    experience: '20 years',
    bio: 'Experienced cardiologist dedicated to helping patients manage heart health and maintain an active lifestyle.',
    profileImage: 'https://i.pravatar.cc/150?u=a042581f4e29026703d',
    price: '$150/hr',
  },
];

// Generate mock time slots from 9 AM to 5 PM
export const generateTimeSlots = (): string[] => {
  const slots = [];
  for (let i = 9; i <= 17; i++) {
    slots.push(`${i > 12 ? i - 12 : i}:00 ${i >= 12 ? 'PM' : 'AM'}`);
  }
  return slots;
};

export const TIME_SLOTS = generateTimeSlots();

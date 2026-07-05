export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  reviews: number;
  bio: string;
  availability: string;
  image: string;
};

export const doctors: Doctor[] = [
  {
    id: 'dr-priya-sharma',
    name: 'Dr. Priya Sharma',
    specialty: 'Cardiologist',
    experience: '14 yrs',
    rating: 4.9,
    reviews: 312,
    bio: 'Board-certified cardiologist specializing in preventive cardiology and interventional procedures.',
    availability: 'Mon–Sat, 9:00 AM – 3:00 PM',
    image: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'dr-arjun-mehta',
    name: 'Dr. Arjun Mehta',
    specialty: 'Neurologist',
    experience: '11 yrs',
    rating: 4.8,
    reviews: 208,
    bio: 'Expert in neurology with a focus on epilepsy, stroke management, and cognitive disorders.',
    availability: 'Tue–Sun, 10:00 AM – 4:00 PM',
    image: 'https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'dr-ananya-rao',
    name: 'Dr. Ananya Rao',
    specialty: 'Pediatrician',
    experience: '9 yrs',
    rating: 4.9,
    reviews: 276,
    bio: 'Compassionate pediatrician dedicated to child wellness, vaccinations, and developmental care.',
    availability: 'Mon–Fri, 8:00 AM – 2:00 PM',
    image: 'https://images.pexels.com/photos/8460317/pexels-photo-8460317.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'dr-rohan-verma',
    name: 'Dr. Rohan Verma',
    specialty: 'Orthopedic Surgeon',
    experience: '16 yrs',
    rating: 4.7,
    reviews: 189,
    bio: 'Orthopedic surgeon specializing in joint replacement, sports injuries, and spine care.',
    availability: 'Mon–Sat, 11:00 AM – 5:00 PM',
    image: 'https://images.pexels.com/photos/6378980/pexels-photo-6378980.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'dr-meera-iyer',
    name: 'Dr. Meera Iyer',
    specialty: 'Ophthalmologist',
    experience: '12 yrs',
    rating: 4.8,
    reviews: 154,
    bio: 'Eye specialist with expertise in cataract surgery, retinal disorders, and refractive corrections.',
    availability: 'Wed–Mon, 9:00 AM – 3:00 PM',
    image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'dr-vikram-nair',
    name: 'Dr. Vikram Nair',
    specialty: 'General Physician',
    experience: '18 yrs',
    rating: 4.9,
    reviews: 421,
    bio: 'Experienced general physician focused on preventive care, chronic disease management, and wellness.',
    availability: 'Mon–Sun, 8:00 AM – 8:00 PM',
    image: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

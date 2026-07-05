import {
  HeartPulse,
  Stethoscope,
  Brain,
  Bone,
  Baby,
  Eye,
  ScanLine,
  Syringe,
  Activity,
  Microscope,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Service = {
  id: string;
  name: string;
  short: string;
  description: string;
  icon: LucideIcon;
  price: string;
  features: string[];
  color: string;
};

export const services: Service[] = [
  {
    id: 'full-body-checkup',
    name: 'Full Body Health Checkup',
    short: '60+ tests covering heart, liver, kidney, thyroid & more',
    description:
      'Our flagship preventive health package with over 60 lab parameters, ECG, physician consultation, and a personalized wellness report.',
    icon: HeartPulse,
    price: 'From $149',
    features: ['Complete blood count', 'Lipid profile', 'Liver & kidney function', 'Thyroid profile', 'ECG + BP', 'Doctor consultation'],
    color: 'primary',
  },
  {
    id: 'cardiology',
    name: 'Cardiology Care',
    short: 'Heart screenings, ECG, echo & specialist consults',
    description:
      'Comprehensive cardiac evaluation including ECG, 2D echo, stress test, and consultation with board-certified cardiologists.',
    icon: Activity,
    price: 'From $99',
    features: ['12-lead ECG', '2D Echocardiography', 'TMT stress test', 'BP monitoring', 'Cardiologist consult'],
    color: 'error',
  },
  {
    id: 'diagnostics',
    name: 'Diagnostic & Imaging',
    short: 'MRI, CT scan, X-ray, ultrasound & lab tests',
    description:
      'State-of-the-art imaging and pathology lab delivering accurate results with rapid turnaround times.',
    icon: ScanLine,
    price: 'From $49',
    features: ['Digital X-ray', 'MRI & CT scan', 'Ultrasound', 'Pathology lab', 'Same-day reports'],
    color: 'secondary',
  },
  {
    id: 'neurology',
    name: 'Neurology & Brain Health',
    short: 'EEG, nerve conduction & neuro consults',
    description:
      'Advanced neurological assessments for headaches, seizures, neuropathy, and cognitive health.',
    icon: Brain,
    price: 'From $129',
    features: ['EEG', 'Nerve conduction study', 'Neurologist consult', 'Cognitive assessment'],
    color: 'accent',
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics & Bone Health',
    short: 'Joint, spine & bone density evaluations',
    description:
      'Diagnosis and treatment of musculoskeletal conditions including arthritis, fractures, and sports injuries.',
    icon: Bone,
    price: 'From $89',
    features: ['Bone density (DEXA)', 'Joint X-ray', 'Orthopedic consult', 'Physiotherapy plan'],
    color: 'warning',
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics & Child Care',
    short: 'Vaccinations, growth tracking & child wellness',
    description:
      'Compassionate care for infants and children — vaccinations, growth monitoring, and developmental checkups.',
    icon: Baby,
    price: 'From $39',
    features: ['Vaccination schedule', 'Growth tracking', 'Developmental screening', 'Pediatrician consult'],
    color: 'success',
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology',
    short: 'Eye exams, vision & retinal screening',
    description:
      'Complete eye care from routine vision tests to retinal screening for diabetic and hypertensive patients.',
    icon: Eye,
    price: 'From $59',
    features: ['Vision acuity test', 'Retinal screening', 'Glaucoma check', 'Cataract screening'],
    color: 'secondary',
  },
  {
    id: 'vaccination',
    name: 'Vaccination & Immunization',
    short: 'Travel, flu & routine immunizations',
    description:
      'Adult and pediatric vaccinations including travel immunizations, flu shots, and booster doses.',
    icon: Syringe,
    price: 'From $25',
    features: ['Flu & travel vaccines', 'Routine immunization', 'Booster doses', 'Digital certificate'],
    color: 'primary',
  },
  {
    id: 'pathology',
    name: 'Pathology Lab',
    short: 'Blood, urine & specialized lab tests',
    description:
      'NABL-accredited lab offering 500+ tests with home sample collection and digital report delivery.',
    icon: Microscope,
    price: 'From $19',
    features: ['Home sample collection', '500+ tests', 'Digital reports', 'NABL accredited'],
    color: 'accent',
  },
  {
    id: 'general-consultation',
    name: 'General Physician Consultation',
    short: 'Everyday health concerns & follow-ups',
    description:
      'Book an in-person or virtual consultation with our experienced general physicians for any health concern.',
    icon: Stethoscope,
    price: 'From $29',
    features: ['In-person & virtual', 'Prescription support', 'Follow-up included', 'Health advice'],
    color: 'primary',
  },
];

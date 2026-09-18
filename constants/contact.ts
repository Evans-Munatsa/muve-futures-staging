export interface RegionalHub {
  id: string;
  name: string;
  borough: string;
  address: string;
  phone: string;
  type: string;
  focus: string;
  latLng?: { lat: number; lng: number };
}

export const REGIONAL_HUBS: RegionalHub[] = [
  {
    id: 'birmingham-central',
    name: 'Central Birmingham Learning Hub',
    borough: 'Birmingham City Council',
    address: '102 Colmore Row, Birmingham, B3 3AG',
    phone: '0121 405 9284',
    type: 'Main Operations & Assessment Suite',
    focus: 'EBSNA baseline diagnostics, multi-agency team meetings & 1:1 specialist tutoring.',
  },
  {
    id: 'sandwell-dudley',
    name: 'Black Country Outreach Hub',
    borough: 'Sandwell & Dudley Councils',
    address: 'High Street Outreach Centre, West Bromwich, B70 7QX',
    phone: '0121 405 9285',
    type: 'Community Outreach & Nurture Pods',
    focus: 'Small group nurture pods, practical life skills, and supported college transition bridging.',
  },
  {
    id: 'solihull-east',
    name: 'Solihull & East Birmingham Hub',
    borough: 'Solihull Metropolitan Borough Council',
    address: 'Station Road Innovation Hub, Solihull, B91 3RX',
    phone: '0121 405 9286',
    type: 'Vocational & STEM Centre',
    focus: 'Digital creative arts, computer science, sensory de-escalation garden & mechanics workshops.',
  },
  {
    id: 'coventry-warwickshire',
    name: 'Coventry & Warwickshire Satellite',
    borough: 'Coventry City Council',
    address: 'Greyfriars Road Centre, Coventry, CV1 3RY',
    phone: '0121 405 9287',
    type: 'Specialist Reintegration Base',
    focus: 'Section 19 medical illness bridging, hospital education link & dual-registration support.',
  },
];

export const ENQUIRY_SUBJECTS = [
  { value: 'commissioning-new', label: 'New School / LA Commissioning Enquiry' },
  { value: 'ebsna-consultation', label: 'EBSNA Student Case Consultation' },
  { value: 'parent-carer', label: 'Parent / Carer Information & Support' },
  { value: 'partnership-training', label: 'Multi-Agency Training & Collaboration' },
  { value: 'careers-recruitment', label: 'Specialist Educator Careers' },
  { value: 'general', label: 'General Information Request' },
];

export const SERVICE_AREAS = [
  'Birmingham City Council',
  'Sandwell Metropolitan Borough Council',
  'Dudley Metropolitan Borough Council',
  'Solihull Metropolitan Borough Council',
  'Walsall Council',
  'Wolverhampton City Council',
  'Coventry City Council',
  'Warwickshire County Council',
  'Staffordshire & Worcestershire Borders',
];

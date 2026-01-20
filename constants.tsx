
import { Step, StepStatus, Difficulty } from './types';

export const INSTALLATION_STEPS: Step[] = [
  {
    id: 'step-1',
    title: 'Unboxing & Inventory',
    shortDesc: 'Verify all components and tools are ready.',
    fullDesc: 'Carefully open the main crate. Ensure you have the structural frame, electronic module, and the fastener kit. Check for any shipping damage.',
    imageUrl: 'https://picsum.photos/seed/unbox/800/450',
    status: StepStatus.PENDING,
    difficulty: Difficulty.BEGINNER,
    estimatedTime: '10 mins',
    tips: ['Use a safety knife to avoid scratching internal parts.', 'Lay parts on a soft surface.'],
    tools: ['Utility Knife', 'Safety Gloves'],
    specs: [{ label: 'Weight', value: '45kg total' }]
  },
  {
    id: 'step-2',
    title: 'Base Frame Assembly',
    shortDesc: 'Secure the heavy-duty legs to the chassis.',
    fullDesc: 'Align the four corner legs with the pre-drilled holes on the main chassis. Insert M8 bolts and finger tighten before using the torque wrench.',
    imageUrl: 'https://picsum.photos/seed/frame/800/450',
    status: StepStatus.PENDING,
    difficulty: Difficulty.BEGINNER,
    estimatedTime: '25 mins',
    tips: ['Cross-tighten bolts for even pressure.', 'Check levelness before proceeding.'],
    tools: ['13mm Socket Wrench', 'Level Tool'],
    specs: [{ label: 'Torque', value: '15 Nm' }]
  },
  {
    id: 'step-3',
    title: 'Core Module Insertion',
    shortDesc: 'Slide the electronic core into the housing.',
    fullDesc: 'The core module contains sensitive components. Slide it into the center rails until you hear a mechanical click. Do not force the module.',
    imageUrl: 'https://picsum.photos/seed/core/800/450',
    status: StepStatus.PENDING,
    difficulty: Difficulty.EXPERT,
    estimatedTime: '15 mins',
    tips: ['Ensure the guide rails are free of debris.', 'Wear an ESD strap if available.'],
    tools: ['None (Slide mechanism)'],
    specs: [{ label: 'Clearance', value: '0.5mm' }]
  },
  {
    id: 'step-4',
    title: 'Wiring & Termination',
    shortDesc: 'Connect the main harness to the core.',
    fullDesc: 'Route the bundled wiring harness through the side grommets. Plug the 24-pin connector into the core module port labeled B1.',
    imageUrl: 'https://picsum.photos/seed/wire/800/450',
    status: StepStatus.PENDING,
    difficulty: Difficulty.EXPERT,
    estimatedTime: '20 mins',
    tips: ['Use cable ties to keep the path clear.', 'Color codes must match (Red to Red).'],
    tools: ['Wire Stripper (optional)', 'Cable Ties'],
    specs: [{ label: 'Voltage', value: '48V DC' }]
  },
  {
    id: 'step-5',
    title: 'Initial Power On',
    shortDesc: 'Test the system and verify firmware.',
    fullDesc: 'Connect to a stable power source. Flip the master switch. Wait for the green status LED to pulse. Check the diagnostic panel for errors.',
    imageUrl: 'https://picsum.photos/seed/power/800/450',
    status: StepStatus.PENDING,
    difficulty: Difficulty.QUICK_FIX,
    estimatedTime: '5 mins',
    tips: ['Keep clear of moving parts during boot.', 'Stand away from high-voltage terminals.'],
    tools: ['Digital Multimeter'],
    specs: [{ label: 'Startup Time', value: '45 Seconds' }]
  }
];

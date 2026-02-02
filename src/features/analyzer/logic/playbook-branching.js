export const BOREDOM_BRANCHES = {
  tired: [
    {
      type: 'action',
      time: 300,
      label: 'Biology Check',
      prompt: 'Drink water. Eat a stable snack if hungry.'
    },
    {
      type: 'timer',
      time: 1200,
      label: 'Rest Protocol',
      prompt: 'Set a 20-minute timer. Eyes closed or light walk. No phone.'
    },
    {
      type: 'log',
      time: 60,
      label: 'Decision',
      prompt: 'Resume for 10 minutes OR stop for the day.'
    }
  ],
  bored: [
    {
      type: 'timer',
      time: 180,
      label: 'Sensory Zoom',
      prompt: 'Focus on physical details. Sounds, textures, precision.'
    },
    {
      type: 'write',
      time: 300,
      label: 'Gamify',
      prompt: 'Set a constraint (speed, perfect accuracy, zero errors). Write it down.'
    },
    {
      type: 'write',
      time: 300,
      label: 'Add Meaning',
      prompt: 'Who benefits from this being done with care? Dedicate the work.'
    }
  ]
}

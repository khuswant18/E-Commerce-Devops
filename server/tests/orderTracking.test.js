const { generateTrackingSteps } = require('../src/utils/orderTracking');

describe('generateTrackingSteps', () => {
  it('marks all steps as completed when status is DELIVERED', () => {
    const steps = generateTrackingSteps('DELIVERED', new Date('2026-03-01T00:00:00.000Z'));

    expect(steps).toHaveLength(5);
    expect(steps.every((step) => step.completed)).toBe(true);
  });

  it('marks only first step as completed when status is PENDING', () => {
    const steps = generateTrackingSteps('PENDING', new Date('2026-03-01T00:00:00.000Z'));

    expect(steps[0].completed).toBe(true);
    expect(steps[1].completed).toBe(false);
    expect(steps[2].completed).toBe(false);
  });
});

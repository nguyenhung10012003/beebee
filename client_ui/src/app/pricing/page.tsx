import PricingCard from '@/components/cards/pricingCard';

export default function Pricing() {
  const plans = [
    {
      title: 'Starter',
      description: 'For small teams and startups',
      price: '19$',
      annual: false,
      features: [
        'Unlimited projects',
        'Custom analytics',
        'Custom domain',
        '24/7 support',
      ],
    },
    {
      title: 'Pro',
      description: 'For growing businesses',
      price: '39$',
      annual: false,
      features: [
        'All features in Starter',
        'Advanced analytics',
        'Custom domain',
        '24/7 support',
      ],
    },
    {
      title: 'Enterprise',
      description: 'For large businesses',
      price: '99$',
      annual: false,
      features: [
        'All features in Pro',
        'Unlimited users',
        'Custom domain',
        '24/7 support',
      ],
    },
  ];
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-textColor1">
            Designed for business teams like yours
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Explore our range of subscription plans tailored to meet your needs,
            with affordable pricing options designed to provide you
            with the features and flexibility you require for success.
          </p>
        </div>
        <div className="flex md:flex-row flex-col w-full gap-5 justify-between items-center">
          {plans.map((plan, index) => {
            return (
              <PricingCard
                key={index}
                planTitle={plan.title}
                description={plan.description}
                price={plan.price}
                annual={plan.annual}
                features={plan.features}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
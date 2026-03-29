import { motion } from 'framer-motion';

const stats = [
  {
    value: '4.9 Billion',
    label: 'People use social media worldwide',
    bar: 82,
    gradient: 'stat-gradient-violet',
    barColor: 'bg-violet-500',
  },
  {
    value: '$200 Billion',
    label: 'Global social media ad revenue',
    bar: 70,
    gradient: 'stat-gradient-pink',
    barColor: 'bg-pink-500',
  },
  {
    value: '77%',
    label: 'Of businesses use social media for marketing',
    bar: 77,
    gradient: 'stat-gradient-blue',
    barColor: 'bg-blue-500',
  },
  {
    value: '$50K+',
    label: 'Average income for creators with 10K+ followers',
    bar: 55,
    gradient: 'stat-gradient-green',
    barColor: 'bg-emerald-500',
  },
  {
    value: '3.5 Hours',
    label: 'Average daily social media usage per person',
    bar: 45,
    gradient: 'stat-gradient-orange',
    barColor: 'bg-amber-500',
  },
  {
    value: '90%',
    label: 'Of marketers say social media increased brand exposure',
    bar: 90,
    gradient: 'stat-gradient-violet',
    barColor: 'bg-violet-500',
  },
];

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function SocialMediaStats() {
  return (
    <section className="py-24 px-4 section-alt">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <h2 className="text-3xl sm:text-4xl font-bold font-display">
          The Social Media{' '}
          <span className="gradient-text">Opportunity</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Social media is the biggest marketing channel on the planet. Here is
          why smart creators and businesses invest in it.
        </p>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.1 }}
        >
          {stats.map(({ value, label, bar, gradient, barColor }) => (
            <motion.div
              key={label}
              variants={item}
              className={`${gradient} rounded-2xl p-6 text-left space-y-3 glow-card`}
            >
              <p className="text-3xl font-extrabold font-display">{value}</p>
              <p className="text-sm text-muted-foreground font-medium">{label}</p>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full ${barColor} stat-bar-fill`}
                  style={{ width: `${bar}%` }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, Star } from 'lucide-react';

const catalogData = [
  {
    category: "Bed repair & service",
    items: [
      { id: 'b1', name: 'Bed support leg installation', price: 49, rating: 4.8, reviews: '12K', img: '/cat_bed_repair_1781922642792.png' },
      { id: 'b2', name: 'Bed side table repair', price: 49, rating: 4.7, reviews: '5K', img: '/bed_sidetable_1781922873767.png' },
      { id: 'b3', name: 'Bed dismantling', price: 99, rating: 4.9, reviews: '20K', img: '/bed_dismantle_1781922886043.png' },
    ]
  },
  {
    category: "Door & window repairs",
    items: [
      { id: 'd1', name: 'Door latch repair', price: 49, rating: 4.8, reviews: '42K', img: '/cat_door_repair_1781922653894.png' },
      { id: 'd2', name: 'Door hinge repair', price: 49, rating: 4.7, reviews: '31K', img: '/door_hinge_1781922899162.png' },
      { id: 'd3', name: 'Door handle repair', price: 49, rating: 4.8, reviews: '55K', img: '/door_handle_1781922908296.png' },
      { id: 'd4', name: 'Door dismantling', price: 149, rating: 4.6, reviews: '12K', img: '/door_dismantle_1781922921142.png' },
      { id: 'd5', name: 'Door stopper installation', price: 49, rating: 4.9, reviews: '68K', img: '/door_stopper_1781922931632.png' },
    ]
  },
  {
    category: "Wardrobe",
    items: [
      { id: 'w1', name: 'Wardrobe hinge replacement', price: 79, rating: 4.8, reviews: '18K', img: '/cat_wardrobe_repair_1781922664009.png' },
      { id: 'w2', name: 'Wardrobe channel repair', price: 129, rating: 4.7, reviews: '9K', img: '/wardrobe_channel_1781922943125.png' },
    ]
  },
  {
    category: "Drawers & fittings",
    items: [
      { id: 'dr1', name: 'Drawer channel replacement', price: 99, rating: 4.8, reviews: '25K', img: '/cat_drawer_repair_1781922674593.png' },
      { id: 'dr2', name: 'Handle/Knob installation', price: 49, rating: 4.9, reviews: '40K', img: '/drawer_knob_1781922955255.png' },
    ]
  },
  {
    category: "Drilling & installation",
    items: [
      { id: 'i1', name: 'Wall drilling (per hole)', price: 49, rating: 4.9, reviews: '100K+', img: '/cat_drilling_1781922685842.png' },
      { id: 'i2', name: 'TV Wall mount installation', price: 299, rating: 4.8, reviews: '35K', img: '/tv_mount_1781922966315.png' },
      { id: 'i3', name: 'Mirror installation', price: 149, rating: 4.8, reviews: '22K', img: '/mirror_install_1781922978146.png' },
    ]
  },
  {
    category: "Curtain & blinds",
    items: [
      { id: 'c1', name: 'Curtain rod installation', price: 149, rating: 4.8, reviews: '45K', img: '/cat_curtain_1781922697609.png' },
      { id: 'c2', name: 'Blinds installation', price: 199, rating: 4.7, reviews: '15K', img: '/cat_curtain_1781922697609.png' },
    ]
  },
  {
    category: "Furniture assembly",
    items: [
      { id: 'f1', name: 'Chair/Table assembly', price: 199, rating: 4.8, reviews: '30K', img: '/cat_furniture_1781922709728.png' },
      { id: 'f2', name: 'Bed assembly', price: 399, rating: 4.9, reviews: '18K', img: '/cat_furniture_1781922709728.png' },
    ]
  },
  {
    category: "Custom",
    items: [
      { id: 'cu1', name: 'Custom woodwork', price: 499, rating: 4.9, reviews: '12K', img: '/custom-woodwork.png' },
      { id: 'cu2', name: 'Bespoke furniture request', price: 999, rating: 4.9, reviews: '8K', img: '/portfolio-3.png' },
    ]
  }
];

const ServiceCatalog = () => {
  const [activeCategory, setActiveCategory] = useState(catalogData[0].category);
  const [cart, setCart] = useState([]);

  const toggleCart = (item) => {
    if (cart.find(c => c.id === item.id)) {
      setCart(cart.filter(c => c.id !== item.id));
    } else {
      setCart([...cart, item]);
    }
  };

  const scrollToCategory = (categoryName) => {
    setActiveCategory(categoryName);
    const element = document.getElementById(`category-${categoryName.replace(/\s+/g, '-')}`);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleCheckout = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const itemList = cart.map(item => `- ${item.name} (Starts at ₹${item.price})`).join('\n');
    const message = `Hi SreeWoodWorks, I would like to book the following services:\n\n${itemList}\n\n*Total Estimated Starting Price: ₹${total}*\n\nPlease let me know the next steps.`;
    window.open(`https://wa.me/919840486789?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Top Banner */}
      <div className="bg-[#fcf8f3] rounded-2xl p-6 md:p-10 mb-10 flex items-center justify-between overflow-hidden relative">
        <div className="relative z-10 max-w-lg">
          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold tracking-wider uppercase rounded-sm mb-3">
            Top Rated Services
          </span>
          <h2 className="font-heading text-3xl md:text-5xl text-primary mb-2">
            Carpenter
          </h2>
          <p className="text-xl md:text-2xl text-primary/80 font-medium">
            Affordable repairs starting at just <span className="font-bold">₹49</span>
          </p>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 md:opacity-100 mix-blend-multiply pointer-events-none">
          <img src="/service-doors.png" alt="Carpenter" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 relative">
        {/* Sidebar Navigation */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 bg-white border border-warm-gray/20 rounded-xl p-4 shadow-sm">
            <h3 className="font-heading text-lg text-primary mb-4 px-2">Categories</h3>
            <ul className="space-y-1">
              {catalogData.map((cat) => (
                <li key={cat.category}>
                  <button
                    onClick={() => scrollToCategory(cat.category)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      activeCategory === cat.category
                        ? 'bg-cream text-primary font-medium border-l-2 border-accent rounded-l-none'
                        : 'text-warm-gray hover:bg-cream/50'
                    }`}
                  >
                    {cat.category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile Horizontal Navigation */}
        <div className="lg:hidden sticky top-[81px] z-20 bg-white/95 backdrop-blur-md pb-4 pt-2 -mx-4 px-4 overflow-x-auto whitespace-nowrap border-b border-warm-gray/10 hide-scrollbar">
          <div className="flex gap-2">
             {catalogData.map((cat) => (
              <button
                key={cat.category}
                onClick={() => scrollToCategory(cat.category)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                  activeCategory === cat.category
                    ? 'bg-primary text-white'
                    : 'bg-cream text-primary hover:bg-cream-dark'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {catalogData.map((cat) => (
            <div key={cat.category} id={`category-${cat.category.replace(/\s+/g, '-')}`} className="mb-12 pt-4">
              <h3 className="font-heading text-2xl text-primary mb-6 border-b border-warm-gray/20 pb-2">
                {cat.category}
              </h3>
              
              <div className="space-y-6">
                {cat.items.map((item) => {
                  const isInCart = cart.find(c => c.id === item.id);
                  return (
                    <div key={item.id} className="flex gap-4 p-4 border border-warm-gray/10 rounded-xl hover:shadow-md transition-shadow bg-white">
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-primary mb-1.5">{item.name}</h4>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="flex items-center text-[11px] font-medium text-amber-500">
                            <Star size={10} className="fill-amber-500 mr-0.5" />
                            {item.rating} ({item.reviews})
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mb-3">
                          <span className="text-[11px] text-warm-gray">Starting from</span>
                          <span className="font-bold text-sm text-primary">₹{item.price}</span>
                        </div>

                      </div>
                      
                      <div className="w-24 shrink-0 flex flex-col items-center gap-3">
                        <div className="w-24 h-24 bg-cream rounded-lg overflow-hidden border border-warm-gray/10">
                          {item.img ? (
                            <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-cream-dark/30 flex items-center justify-center text-warm-gray/50">
                              <Plus size={24} />
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => toggleCart(item)}
                          className={`w-full py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 ${
                            isInCart 
                              ? 'bg-green-50 text-green-600 border border-green-200'
                              : 'bg-white text-accent border border-accent hover:bg-accent hover:text-white'
                          }`}
                        >
                          {isInCart ? <><Check size={12} /> Added</> : 'Add'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Floating Cart Summary for Mobile/Desktop */}
        {cart.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-primary text-white p-4 rounded-xl shadow-2xl z-50 flex items-center justify-between">
            <div>
              <p className="text-xs text-white/70 uppercase tracking-wider mb-0.5">Booking Cart</p>
              <p className="font-bold">{cart.length} service{cart.length > 1 ? 's' : ''} | ₹{cart.reduce((sum, item) => sum + item.price, 0)}</p>
            </div>
            <button 
              onClick={handleCheckout}
              className="bg-white text-primary px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-cream transition-colors"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCatalog;

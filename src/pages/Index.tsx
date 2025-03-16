
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BarChart3, LineChart, ShoppingCart, ArrowRight } from 'lucide-react';
import GlassMorphCard from '@/components/ui/GlassMorphCard';
import { staggerContainer, staggerItem } from '@/utils/transitions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AIAnnotation from '@/components/ui/AIAnnotation';
import { getAIInsights } from '@/utils/googleSheetsHelpers';

const Index = () => {
  const navigate = useNavigate();
  const [businessType, setBusinessType] = useState('');
  const [productLifecycle, setProductLifecycle] = useState('');
  const [salesChannels, setSalesChannels] = useState({ online: '', offline: '' });
  const [forecastingGoals, setForecastingGoals] = useState({
    replenishment: false,
    newProduct: false,
    promotions: false,
    seasonality: false
  });

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const handleContinue = () => {
    navigate('/data-source');
  };

  // Get AI insights for demo purposes
  const aiInsights = getAIInsights([]);

  return (
    <div className="overflow-y-auto p-4 h-full">
      <div className="max-w-5xl mx-auto py-4">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold tracking-tight mb-1">FeatureBox AI</h1>
          <p className="text-sm text-gray-600">Connect your data and generate accurate forecasts</p>
        </motion.div>

        <AIAnnotation title="AI Assistant">
          <p className="text-sm mb-2">Based on your sheet data, I recommend starting with these insights:</p>
          <ul className="text-sm list-disc pl-5 space-y-1">
            {aiInsights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </AIAnnotation>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <motion.div variants={staggerItem}>
            <GlassMorphCard 
              className="h-full"
              onClick={() => handleCardClick('/data-source')}
            >
              <div className="flex flex-col items-center text-center h-full p-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
                  <BarChart3 size={20} />
                </div>
                <h3 className="text-base font-medium mb-2">Data Insights</h3>
                <p className="text-xs text-gray-600">
                  Explore your sales and inventory data to identify trends.
                </p>
              </div>
            </GlassMorphCard>
          </motion.div>

          <motion.div variants={staggerItem}>
            <GlassMorphCard 
              className="h-full"
              onClick={() => handleCardClick('/data-source')}
            >
              <div className="flex flex-col items-center text-center h-full p-4">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3">
                  <LineChart size={20} />
                </div>
                <h3 className="text-base font-medium mb-2">Demand Forecasting</h3>
                <p className="text-xs text-gray-600">
                  Generate AI forecasts based on historical data.
                </p>
              </div>
            </GlassMorphCard>
          </motion.div>

          <motion.div variants={staggerItem}>
            <GlassMorphCard 
              className="h-full"
              onClick={() => handleCardClick('/constraints')}
            >
              <div className="flex flex-col items-center text-center h-full p-4">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-3">
                  <ShoppingCart size={20} />
                </div>
                <h3 className="text-base font-medium mb-2">Decision Making</h3>
                <p className="text-xs text-gray-600">
                  Optimize inventory based on AI forecasts and constraints.
                </p>
              </div>
            </GlassMorphCard>
          </motion.div>
        </motion.div>

        <Card className="mb-6">
          <CardContent className="pt-4">
            <h2 className="text-base font-semibold mb-4">Business Context</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Business Type</label>
                <select 
                  className="w-full p-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                >
                  <option value="">Select Type</option>
                  <option value="apparel">Apparel</option>
                  <option value="beauty">Beauty</option>
                  <option value="electronics">Electronics</option>
                  <option value="homeGoods">Home Goods</option>
                  <option value="food">Food & Beverage</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Product Lifecycle</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Seasonal', 'Evergreen', 'Short'].map((type) => (
                    <label 
                      key={type}
                      className={`flex items-center justify-center p-1.5 text-xs border rounded-md cursor-pointer transition-colors ${
                        productLifecycle === type.toLowerCase() 
                          ? 'bg-blue-50 border-blue-500 text-blue-700' 
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        className="sr-only"
                        name="productLifecycle"
                        value={type.toLowerCase()}
                        checked={productLifecycle === type.toLowerCase()}
                        onChange={(e) => setProductLifecycle(e.target.value)}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 mb-1">Sales Channel Split (%)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Online</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="e.g. 60"
                    className="w-full p-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={salesChannels.online}
                    onChange={(e) => setSalesChannels({...salesChannels, online: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Offline</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="e.g. 40"
                    className="w-full p-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={salesChannels.offline}
                    onChange={(e) => setSalesChannels({...salesChannels, offline: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Forecasting Goals</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'replenishment', label: 'Replenishment' },
                  { id: 'newProduct', label: 'New Product Launch' },
                  { id: 'promotions', label: 'Promotions' },
                  { id: 'seasonality', label: 'Seasonality' }
                ].map((goal) => (
                  <label 
                    key={goal.id}
                    className={`flex items-center p-2 text-xs border rounded-md cursor-pointer transition-colors ${
                      forecastingGoals[goal.id as keyof typeof forecastingGoals] 
                        ? 'bg-blue-50 border-blue-500 text-blue-700' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mr-1.5 h-3 w-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={forecastingGoals[goal.id as keyof typeof forecastingGoals]}
                      onChange={(e) => setForecastingGoals({...forecastingGoals, [goal.id]: e.target.checked})}
                    />
                    <span className="text-xs">{goal.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button 
            onClick={handleContinue}
            className="flex items-center gap-1 text-sm py-1.5 px-3"
            size="sm"
          >
            Next
            <ArrowRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;

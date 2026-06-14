'use client';

import React, { useState } from 'react';
import { Calculator, Info, Ruler, Settings2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CostCalculator() {
  const [material, setMaterial] = useState<'flex' | 'sav'>('flex');
  const [unit, setUnit] = useState<'ft' | 'in'>('ft');
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [qty, setQty] = useState<string>('1');

  const materialPrices = {
    flex: 250,
    sav: 300,
  };

  const calculateCost = () => {
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    const q = parseInt(qty) || 1;

    if (w <= 0 || h <= 0 || q <= 0) return 0;

    let sqft = w * h;
    if (unit === 'in') {
      sqft = sqft / 144;
    }

    const pricePerSqft = materialPrices[material];
    return sqft * pricePerSqft * q;
  };

  const rawTotal = calculateCost();
  const isCalculated = rawTotal > 0;
  const finalTotal = isCalculated && rawTotal < 5000 ? 5000 : rawTotal;

  const whatsappMessage = `Hi BOMedia, I used your calculator and want to order:
Material: ${material.toUpperCase()}
Size: ${width}${unit} x ${height}${unit}
Qty: ${qty || 1}
Estimated Price: ₦${finalTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  const whatsappLink = `https://wa.me/2348022247567?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row w-full max-h-[90vh] overflow-y-auto">
      {/* Input Form */}
      <div className="flex-1 p-6 md:p-8 bg-white">
        <div className="mb-6">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Cost Calculator</h2>
          <p className="text-slate-600">Instantly estimate your print cost.</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          
          {/* Material Selection */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <ImageIcon className="w-4 h-4 text-primary-500" />
              Select Material
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setMaterial('flex')}
                className={`relative p-4 rounded-xl border-2 transition-all ${
                  material === 'flex'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-slate-200 hover:border-primary-300'
                }`}
              >
                <div className="font-bold text-slate-900 text-left">Flex Banner</div>
                <div className="text-sm text-slate-500 text-left">₦250 / sqft</div>
                {material === 'flex' && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-primary-500 rounded-full" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setMaterial('sav')}
                className={`relative p-4 rounded-xl border-2 transition-all ${
                  material === 'sav'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-slate-200 hover:border-primary-300'
                }`}
              >
                <div className="font-bold text-slate-900 text-left">SAV Sticker</div>
                <div className="text-sm text-slate-500 text-left">₦300 / sqft</div>
                {material === 'sav' && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-primary-500 rounded-full" />
                )}
              </button>
            </div>
          </div>

          {/* Unit Toggle */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Ruler className="w-4 h-4 text-primary-500" />
              Measurement Unit
            </label>
            <div className="flex items-center bg-slate-100 p-1 rounded-lg w-fit">
              <button
                type="button"
                onClick={() => setUnit('ft')}
                className={`px-6 py-2 rounded-md font-medium text-sm transition-all ${
                  unit === 'ft' ? 'bg-white shadow-sm text-primary-700' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Feet (ft)
              </button>
              <button
                type="button"
                onClick={() => setUnit('in')}
                className={`px-6 py-2 rounded-md font-medium text-sm transition-all ${
                  unit === 'in' ? 'bg-white shadow-sm text-primary-700' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Inches (in)
              </button>
            </div>
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Width ({unit})</label>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="e.g. 10"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Height ({unit})</label>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="e.g. 8"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              />
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-2 w-1/2 pr-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Settings2 className="w-4 h-4 text-primary-500" />
              Quantity
            </label>
            <input
              type="number"
              min="1"
              placeholder="1"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            />
          </div>
        </form>
      </div>

      {/* Result Panel */}
      <div className="md:w-[320px] lg:w-[380px] bg-slate-900 text-white p-6 md:p-8 flex flex-col shrink-0">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-white/10 rounded-xl">
            <Calculator className="w-6 h-6 text-primary-400" />
          </div>
          <h3 className="font-bold text-xl">Estimated Total</h3>
        </div>

        <div className="flex-1">
          <div className="text-slate-400 text-sm font-medium mb-2">Total Price</div>
          <div className="text-4xl lg:text-5xl font-black text-white tracking-tight">
            <span className="text-primary-400 text-2xl lg:text-3xl mr-1">₦</span>
            {finalTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>

          {isCalculated && rawTotal < 5000 && (
            <div className="mt-6 bg-primary-900/40 border border-primary-500/30 rounded-xl p-4 flex gap-3 text-sm text-primary-200">
              <Info className="w-5 h-5 shrink-0 mt-0.5 text-primary-400" />
              <p>
                <strong>Note:</strong> Our minimum print order value is ₦5,000 to cover base production and machine setup costs.
              </p>
            </div>
          )}
          
          {isCalculated && rawTotal >= 5000 && (
             <div className="mt-6 text-sm text-slate-400">
               Based on {(width ? parseFloat(width) : 0)}x{(height ? parseFloat(height) : 0)}{unit} {material.toUpperCase()} at ₦{materialPrices[material]}/sqft x {qty || 1}
             </div>
          )}
        </div>

        <div className="pt-8 mt-8 border-t border-white/10">
          <Button asChild size="lg" className="w-full h-14 text-lg bg-green-600 hover:bg-green-700 text-white border-0 shadow-lg shadow-green-900/20">
            <Link href={whatsappLink} target="_blank">
              Order via WhatsApp
            </Link>
          </Button>
          <p className="text-xs text-center text-slate-500 mt-4">
            Price excludes delivery and installation.
          </p>
        </div>
      </div>
    </div>
  );
}

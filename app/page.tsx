"use client";

import React, { useState } from 'react';
import LoadModelButton from '../components/LoadModelButton';
import RefreshButton from '../components/RefreshButton';
import SelectDistrictBox from '../components/SelectDistrictBox';
import SelectedDistrictCard from '../components/SelectedDistrictCard';
import ConfirmButton from '../components/ConfirmButton';
import DataTable from '../components/DataTable';
import WarningPopup from '../components/WarningPopup';
import LassoBox from '../components/LassoBox';
import FeatureImportanceChart from '../components/FeatureImportanceChart';
import SaveModelButton from '../components/SaveModelButton';
import SelectedFeatureCard from '../components/SelectedFeatureCard';
import SelectFeatureBox from '../components/SelectFeatureBox';
import ReverseTuneBox from '../components/ReverseTuneBox';

interface SavedModel {
  name: string;
  selectedFeatures: { feature: string; percentage: number }[];
  modelResults: { mae: number; mse: number; r2: number; achievementScore: number };
}

export default function Home() {
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [showTable, setShowTable] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showLassoBox, setShowLassoBox] = useState(false);
  const [showLassoCVWarning, setShowLassoCVWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [featureImportance, setFeatureImportance] = useState<{ feature: string; importance: number }[]>([]);
  const [lassoCVParams, setLassoCVParams] = useState<{ tolerance: number; alpha: number } | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<{ feature: string; percentage: number }[]>([]);
  const [showReverseTune, setShowReverseTune] = useState(false);
  const [modelResults, setModelResults] = useState<{ mae: number; mse: number; r2: number; achievementScore: number } | null>(null);
  const [savedModels, setSavedModels] = useState<SavedModel[]>([]);

  // Mock data for demonstration
  const districts = ['District A', 'District B', 'District C', 'District D'];
  const mockData = [
    { id: 1, name: 'School 1', district: 'District A', score: 85 },
    { id: 2, name: 'School 2', district: 'District B', score: 92 },
    // ... more mock data
  ];

  const handleDistrictSelect = (district: string) => {
    if (!selectedDistricts.includes(district)) {
      setSelectedDistricts([...selectedDistricts, district]);
    }
  };

  const handleDistrictRemove = (district: string) => {
    setSelectedDistricts(selectedDistricts.filter(d => d !== district));
  };

  const handleConfirm = () => {
    setShowWarning(true);
  };

  const handleWarningConfirm = () => {
    setShowWarning(false);
    setShowTable(true);
    setShowLassoBox(true);
  };

  const handleRefresh = () => {
    setSelectedDistricts([]);
    setShowTable(false);
    setShowLassoBox(false);
    setFeatureImportance([]);
    setSelectedFeatures([]);
    setShowReverseTune(false);
    setModelResults(null);
  };

  const handleLassoConfirm = async (tolerance: number, alpha: number) => {
    setIsLoading(true);
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Mock feature importance data
    const mockFeatureImportance = [
      { feature: 'Feature A', importance: 0.8 },
      { feature: 'Feature B', importance: -0.5 },
      { feature: 'Feature C', importance: 0.3 },
      { feature: 'Feature D', importance: -0.2 },
    ];
    setFeatureImportance(mockFeatureImportance);
    setIsLoading(false);
    setShowLassoBox(false);
    setShowReverseTune(true);
  };

  const handleLassoWarning = (tolerance: number, alpha: number) => {
    setLassoCVParams({ tolerance, alpha });
    setShowLassoCVWarning(true);
  };

  const handleLassoCVWarningConfirm = () => {
    setShowLassoCVWarning(false);
    if (lassoCVParams) {
      handleLassoConfirm(lassoCVParams.tolerance, lassoCVParams.alpha);
    }
  };

  const handleFeatureSelect = (feature: string) => {
    if (!selectedFeatures.find(f => f.feature === feature)) {
      setSelectedFeatures([...selectedFeatures, { feature, percentage: 0 }]);
    }
  };

  const handleFeatureRemove = (feature: string) => {
    setSelectedFeatures(selectedFeatures.filter(f => f.feature !== feature));
  };

  const handleFeaturePercentageChange = (feature: string, percentage: number) => {
    setSelectedFeatures(selectedFeatures.map(f => 
      f.feature === feature ? { ...f, percentage } : f
    ));
  };

  const handleReverseTuneConfirm = async () => {
    setIsLoading(true);
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Mock model results
    const mockResults = {
      mae: 0.1234,
      mse: 0.0567,
      r2: 0.8901,
      achievementScore: 95.67
    };
    setModelResults(mockResults);
    setIsLoading(false);
  };

  const handleSaveModel = (modelName: string) => {
    if (savedModels.length >= 10) {
      alert("You can only save up to 10 models. Please delete a model before saving a new one.");
      return;
    }

    if (modelResults) {
      const newModel: SavedModel = {
        name: modelName,
        selectedFeatures,
        modelResults,
      };
      setSavedModels([...savedModels, newModel]);
    }
  };

  const handleLoadModel = (modelName: string) => {
    const model = savedModels.find(m => m.name === modelName);
    if (model) {
      setSelectedFeatures(model.selectedFeatures);
      setModelResults(model.modelResults);
      setShowTable(true);
      setShowReverseTune(true);
      setFeatureImportance(model.selectedFeatures.map(f => ({ feature: f.feature, importance: f.percentage })));
    }
  };

  const handleDeleteModel = (modelName: string) => {
    setSavedModels(savedModels.filter(m => m.name !== modelName));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome to School Achievement Dashboard!</h1>
        <div>
          <LoadModelButton 
            savedModels={savedModels.map(m => m.name)} 
            onLoad={handleLoadModel}
            onDelete={handleDeleteModel}
          />
          <RefreshButton onRefresh={handleRefresh} />
        </div>
      </div>

      {!showTable && (
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <span className="font-bold">Select District(s):</span>
            <SelectDistrictBox districts={districts} onSelect={handleDistrictSelect} />
            <ConfirmButton onClick={handleConfirm} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedDistricts.map(district => (
              <SelectedDistrictCard key={district} district={district} onRemove={handleDistrictRemove} />
            ))}
          </div>
        </div>
      )}

      {showTable && (
        <div className="mb-8">
          <DataTable data={mockData} columns={['id', 'name', 'district', 'score']} />
        </div>
      )}

      {showLassoBox && (
        <LassoBox onConfirm={handleLassoConfirm} onWarning={handleLassoWarning} />
      )}

      {isLoading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      )}

      {featureImportance.length > 0 && (
        <div className="flex mt-8">
          <div className="w-1/2 pr-4">
            <h2 className="text-2xl font-bold mb-4">Feature Importance</h2>
            <FeatureImportanceChart data={featureImportance} />
          </div>
          {showReverseTune && (
            <div className="w-1/2 pl-4">
              <h2 className="text-2xl font-bold mb-4">Reverse Tune</h2>
              <div className="mb-4">
                <span className="font-bold">Select Features to Tune:</span>
                <SelectFeatureBox 
                  features={featureImportance.map(f => f.feature)} 
                  onSelect={handleFeatureSelect} 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedFeatures.map(({ feature, percentage }) => (
                  <SelectedFeatureCard 
                    key={feature} 
                    feature={feature} 
                    onRemove={handleFeatureRemove}
                    onPercentageChange={handleFeaturePercentageChange}
                  />
                ))}
              </div>
              <ConfirmButton onClick={handleReverseTuneConfirm} />
            </div>
          )}
        </div>
      )}

      {modelResults && (
        <div className="mt-8">
          <ReverseTuneBox {...modelResults} />
          <SaveModelButton onSave={handleSaveModel} />
        </div>
      )}

      <WarningPopup 
        isOpen={showWarning}
        onClose={() => setShowWarning(false)}
        onConfirm={handleWarningConfirm}
        message="The number of selected districts might affect model performance. Proceed?"
      />

      <WarningPopup 
        isOpen={showLassoCVWarning}
        onClose={() => setShowLassoCVWarning(false)}
        onConfirm={handleLassoCVWarningConfirm}
        message="The entered values for Tolerance or Alpha are outside the recommended range (0.0001 to 1.0). This might affect model performance. Proceed?"
      />
    </div>
  );
}
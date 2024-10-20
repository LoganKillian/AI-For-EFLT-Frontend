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
import ComparisonSelector from '@/components/ComparisonSelector';
import ComparisonLassoBox from '../components/ComparisonLassoBox';
import ModelComparisonChart from '@/components/ModelComparisonChart';

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
  const [showComparisonSelector, setShowComparisonSelector] = useState(true); 
  const [showComparisonLassoBox, setShowComparisonLassoBox] = useState(false);
  const [featureImportance1, setFeatureImportance1] = useState<{ feature: string; importance: number }[]>([]);
  const [featureImportance2, setFeatureImportance2] = useState<{ feature: string; importance: number }[]>([]);
  const [selectedFeatures1, setSelectedFeatures1] = useState<{ feature: string; percentage: number }[]>([]);
  const [selectedFeatures2, setSelectedFeatures2] = useState<{ feature: string; percentage: number }[]>([]);
  const [CompareModelResults, setCompareModelResults] = useState<{
    district1: { mae: number; mse: number; r2: number; achievementScore: number };
    district2: { mae: number; mse: number; r2: number; achievementScore: number };
  } | null>(null);
  // Mock data for demonstration
  const districts = ['District A', 'District B', 'District C', 'District D'];
  const mockData = [
    { id: 1, name: 'School 1', district: 'District A', score: 85 },
    { id: 2, name: 'School 2', district: 'District B', score: 92 },
    // ... more mock data
  ];
  
  const handleCompare = (selected: string[]) => {
    setShowTable(true);
    setShowComparisonSelector(false);
    setShowLassoBox(false); //
    setShowComparisonLassoBox(true);
  };
  
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
    setShowComparisonSelector(false);
  };

  const handleRefresh = () => {
    setSelectedDistricts([]);
    setShowTable(false);
    setShowLassoBox(false);
    setFeatureImportance([]);
    setFeatureImportance1([]);
    setFeatureImportance2([]);
    setSelectedFeatures([]);
    setShowReverseTune(false);
    setModelResults(null);
    setShowComparisonSelector(true);
    setShowComparisonLassoBox(false);
    setCompareModelResults(null);
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
  
 const handleCompareLassoConfirm = async (tolerance: number, alpha: number) => {
    setIsLoading(true);
  
    // Simulate API call for first feature importance
    await new Promise(resolve => setTimeout(resolve, 2000));
    const mockFeatureImportance1 = [
      { feature: 'Feature A', importance: 0.8 },
      { feature: 'Feature B', importance: -0.3 },
      { feature: 'Feature C', importance: 0.5 },
      { feature: 'Feature D', importance: 0.9 },
    ];
    setFeatureImportance1(mockFeatureImportance1);
  
    // Simulate API call for second feature importance
    await new Promise(resolve => setTimeout(resolve, 2000));
    const mockFeatureImportance2 = [
      { feature: 'Feature A', importance: 0.7 },
      { feature: 'Feature B', importance: -0.4 },
      { feature: 'Feature C', importance: 0.2 },
      { feature: 'Feature D', importance: -0.5 },
    ];
    setFeatureImportance2(mockFeatureImportance2);
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
  const handleFeatureSelect1 = (feature: string) => {
  if (!selectedFeatures1.find(f => f.feature === feature)) {
    setSelectedFeatures1([...selectedFeatures1, { feature, percentage: 0 }]);
  }
};

  const handleFeatureSelect2 = (feature: string) => {
  if (!selectedFeatures2.find(f => f.feature === feature)) {
    setSelectedFeatures2([...selectedFeatures2, { feature, percentage: 0 }]);
  }
};

  const handleFeatureRemove1 = (feature: string) => {
  setSelectedFeatures1(selectedFeatures1.filter(f => f.feature !== feature));
};

  const handleFeatureRemove2 = (feature: string) => {
  setSelectedFeatures2(selectedFeatures2.filter(f => f.feature !== feature));
};

  const handleFeaturePercentageChange1 = (feature: string, percentage: number) => {
  setSelectedFeatures1(selectedFeatures1.map(f =>
    f.feature === feature ? { ...f, percentage } : f
  ));
};

  const handleFeaturePercentageChange2 = (feature: string, percentage: number) => {
  setSelectedFeatures2(selectedFeatures2.map(f =>
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
  const handleComparisonReverseTuneConfirm = async () => {
  setIsLoading(true);

  // Simulating API call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock results for both districts
  const CompareModelResults = {
    district1: {
      mae: 0.1234,
      mse: 0.0567,
      r2: 0.8901,
      achievementScore: 95.67,
    },
    district2: {
      mae: 0.2234,
      mse: 0.0767,
      r2: 0.7801,
      achievementScore: 88.45,
    },
  };

  setCompareModelResults(CompareModelResults);
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
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
  {/* Header Section */}
  <div className="flex justify-between items-center bg-blue-600 text-white p-4 rounded-lg shadow-md mb-6">
    <h1 className="text-3xl font-bold">Welcome to School Achievement Dashboard!</h1>
    <div className="space-x-4">
      <LoadModelButton
        savedModels={savedModels.map((m) => m.name)}
        onLoad={handleLoadModel}
        onDelete={handleDeleteModel}
      />
      <RefreshButton onRefresh={handleRefresh} />
    </div>
  </div>
  
  {/* District Selection or Table Display */}
  {!showTable ? (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <div className="flex items-center space-x-4 mb-6">
        <span className="font-semibold">Select District(s):</span>
        <SelectDistrictBox districts={districts} onSelect={handleDistrictSelect} />
        <ConfirmButton onClick={handleConfirm} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedDistricts.map((district) => (
          <SelectedDistrictCard
            key={district}
            district={district}
            onRemove={handleDistrictRemove}
            className="bg-gray-100 p-4 rounded-lg shadow-sm"
          />
        ))}
      </div>
    </div>
  ) : (
    <div className="mb-8 overflow-x-auto">
      <DataTable
        data={mockData}
        columns={['id', 'name', 'district', 'score']}
        className="w-full table-auto border-collapse border border-gray-200"
      />
    </div>
  )}

     {/* Comparison Selector Section */}
     {showComparisonSelector && (
        <ComparisonSelector
          districts={districts}
          onCompare={handleCompare}
        />
      )}
  {/* Lasso Box Section */}
  {showLassoBox && (
    <LassoBox onConfirm={handleLassoConfirm} onWarning={handleLassoWarning} className="mb-6" />
  )}

  {/* Lasso Box Section */}
  {showComparisonLassoBox && (
    <ComparisonLassoBox onConfirm={handleCompareLassoConfirm} onWarning={handleLassoWarning} className="mb-6" />
  )}

  {/* Loading Animation */}
  {isLoading && (
    <div className="flex justify-center items-center mt-8">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      <p className="text-lg font-semibold mt-4">Loading, please wait...</p>
    </div>
  )}

  {/* Feature Importance & Reverse Tune Sections */}
  {featureImportance.length > 0 && (
    <div className="flex mt-8 gap-6">
      <div className="w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Feature Importance</h2>
        <FeatureImportanceChart data={featureImportance} />
      </div>
      {showReverseTune && (
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Reverse Tune</h2>
          <SelectFeatureBox
            features={featureImportance.map((f) => f.feature)}
            onSelect={handleFeatureSelect}
            className="mb-4"
          />
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
          <ConfirmButton onClick={handleReverseTuneConfirm} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" />
        </div>
      )}
    </div>
  )}

{featureImportance1.length > 0 && featureImportance2.length > 0 && (
  <div className="mt-8">
    <h2 className="text-2xl font-semibold mb-6 text-center">Feature Importance & Reverse Tune</h2>

    {/*  Each District Feature Importance & Reverse Tune */}
    <div className="flex gap-8">
      {/* District 1 */}
      <div className="w-1/2">
        <h3 className="text-xl font-semibold mb-4">District 1</h3>
        <FeatureImportanceChart data={featureImportance1} />
        <SelectFeatureBox
          features={featureImportance1.map((f) => f.feature)}
          onSelect={handleFeatureSelect1}
          className="mb-4"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedFeatures1.map(({ feature, percentage }) => (
            <SelectedFeatureCard
              key={feature}
              feature={feature}
              onRemove={handleFeatureRemove1}
              onPercentageChange={(percentage) =>
                handleFeaturePercentageChange1(feature, percentage)
              }
            />
          ))}
        </div>
      </div>

      {/* District 2 */}
      <div className="w-1/2">
        <h3 className="text-xl font-semibold mb-4">District 2</h3>
        <FeatureImportanceChart data={featureImportance2} />
        <SelectFeatureBox
          features={featureImportance2.map((f) => f.feature)}
          onSelect={handleFeatureSelect2}
          className="mb-4"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedFeatures2.map(({ feature, percentage }) => (
            <SelectedFeatureCard
              key={feature}
              feature={feature}
              onRemove={handleFeatureRemove2}
              onPercentageChange={(percentage) =>
                handleFeaturePercentageChange2(feature, percentage)
              }
            />
          ))}
        </div>
      </div>
    </div>

    {/* Confirm Button */}
    <div className="mt-8 flex justify-center">
      <ConfirmButton
        onClick={handleComparisonReverseTuneConfirm}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded"
      >
        Confirm Comparison Reverse Tune
      </ConfirmButton>
    </div>
  </div>
)}

  {/* Model Results Section */}
  {modelResults && (
    <div className="mt-8">
      <ReverseTuneBox {...modelResults} />
      <SaveModelButton onSave={handleSaveModel} className="mt-4" />
    </div>
  )}

{/* Model Results Section for Comparison */}
{CompareModelResults && (
  <div className="mt-8">
    
    <ModelComparisonChart CompareModelResults={CompareModelResults} />
  </div>
)}


  {/* Warning Popups */}
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

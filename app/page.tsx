"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadModelButton from '../components/LoadModelButton';
import RefreshButton from '../components/RefreshButton';
import SelectedDistrictCard from '../components/SelectedDistrictCard';
import ConfirmButton from '../components/ConfirmButton';
import DataTable from '../components/DataTable';
import WarningPopup from '../components/WarningPopup';
import LassoBox from '../components/LassoBox';
import FeatureImportanceChart from '../components/FeatureImportanceChart';
import SaveModelButton from '../components/SaveModelButton';
import SelectedFeatureCard from '../components/SelectedFeatureCard';
import MultiSelectDistrictBox from '../components/MultiSelectDistrictBox';
import MultiSelectFeatureBox from '../components/MultiSelectFeatureBox';
import MetricsBox from '../components/MetricsBox';
import TunedDataTable from '../components/TunedDataTable';
import MultiSelectGradeBox from '../components/MultiSelectGradeBox';
import MultiSelectYearBox from '../components/MultiSelectYearBox';
import SelectedGradeCard from '../components/SelectedGradeCard';
import SelectedYearCard from '../components/SelectedYearCard';


//import SelectDistrictBox from '../components/SelectDistrictBox';
//import SelectFeatureBox from '../components/SelectFeatureBox';

interface SavedModel {
  name: string;
  selectedFeatures: { feature: string; percentage: number }[];
  modelResults: { mae: number; mse: number; r2: number; achievementScore: number };
  tunedFeatureImportance?: { feature: string; importance: number }[];
}

export default function Home() {
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [grades, setGrades] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [showTable, setShowTable] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showLassoBox, setShowLassoBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [featureImportance, setFeatureImportance] = useState<{ feature: string; importance: number }[]>([]);
  const [showReverseTune, setShowReverseTune] = useState(false);
  const [savedModels, setSavedModels] = useState([]);
  const [modelResults, setModelResults] = useState(null);
  const [lassoResults, setLassoResults] = useState(null);
  const [allData, setAllData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [tableColumns, setTableColumns] = useState(0);
  const [availableFeatures, setAvailableFeatures] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<{ feature: string; percentage: number }[]>([]);
  const [showFeatureSelection, setShowFeatureSelection] = useState(false);
  const [isReverseTuning, setIsReverseTuning] = useState(false);
  const [originalData, setOriginalData] = useState<any[]>([]);
  const [tunedData, setTunedData] = useState<any[]>([]);
  const [tunedFeatureImportance, setTunedFeatureImportance] = useState<{ feature: string; importance: number }[]>([]);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/districts');
        setDistricts(response.data.districts);
      } catch (error) {
        console.error('Error fetching districts', error);
      }
    };
    fetchDistricts();
  }, []);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/grades');
        setGrades(response.data.grades);
      } catch (error) {
        console.error('Error fetching grades', error);
      }
    };
    fetchGrades();
  }, []);
  
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/years');
        setYears(response.data.years);
      } catch (error) {
        console.error('Error fetching years', error);
      }
    };
    fetchYears();
  }, []);

  const handleDistrictSelect = (districts: string[]) => {
    setSelectedDistricts(districts);
  };

  const handleDistrictRemove = (district: string) => {
    setSelectedDistricts(selectedDistricts.filter(d => d !== district));
  };

  const handleGradeSelect = (grades: string[]) => {
    setSelectedGrades(grades);
  };
  
  const handleGradeRemove = (grade: string) => {
    setSelectedGrades(selectedGrades.filter(g => g !== grade));
  };
  
  const handleYearSelect = (years: string[]) => {
    setSelectedYears(years);
  };
  
  const handleYearRemove = (year: string) => {
    setSelectedYears(selectedYears.filter(y => y !== year));
  };

  // TODO: RENAME HANDLECONFIRM AND HANDLEWARNINGCONFIRM TO BETTER REFLECT BEHAVIOR
  const handleConfirm = async () => {
    // Show warning only if selected districts are between 1 and 5
    if (selectedDistricts.length >= 1 && selectedDistricts.length <= 5) {
      setShowWarning(true);
    } else {
      // If districts count is > 5, proceed directly
      handleWarningConfirm();
    }
  };

  const handleWarningConfirm = async () => {
    setShowWarning(false);
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/filter_data', {
        params: {
          district_name: selectedDistricts.length > 0 ? selectedDistricts.join(',') : 'all',
          grade: selectedGrades.length > 0 ? selectedGrades.join(',') : 'all',
          year: selectedYears.length > 0 ? selectedYears.join(',') : 'all'
        }
      });
      setAllData(response.data.data);
      setTableColumns(response.data.columns);
      setTotalRows(response.data.total_rows);
      setCurrentPage(1);
      setShowTable(true);
      setShowLassoBox(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return allData.slice(startIndex, endIndex);
  };


  const handleRefresh = () => {
    setSelectedDistricts([]);
    setSelectedGrades([]);
    setSelectedYears([]);
    setShowTable(false);
    setShowLassoBox(false);
    setFeatureImportance([]);
    setSelectedFeatures([]);
    setShowReverseTune(false);
    setModelResults(null);
  };

  const handleLassoConfirm = async (tolerance: number, alpha: number) => {
    setIsLoading(true);
  
    try {
      const response = await axios.post('http://localhost:5000/api/run_lasso', {
        tolerance,
        alpha,
        districts: selectedDistricts,
        grades: selectedGrades,
        years: selectedYears,
      });
  
      const { metrics, feature_importance, overall_achievement_score } = response.data;
      console.log('Lasso Response:', response.data);
  
      const transformedFeatureImportance = feature_importance.map((item: any) => ({
        feature: item.feature,
        importance: item.Coefficients
      }))
      .sort((a: any, b: any) => Math.abs(b.importance) - Math.abs(a.importance));
  
      setFeatureImportance(transformedFeatureImportance);
      setLassoResults({ metrics, overall_achievement_score });  // Store Lasso results separately
      setModelResults({ metrics, overall_achievement_score });  // Keep this for initial display
      
      const featuresResponse = await axios.get('http://localhost:5000/api/get_tunable_features');
      setAvailableFeatures(featuresResponse.data);
      
      setShowLassoBox(false);
      setShowFeatureSelection(true);
    } catch (error) {
      console.error("Error running LassoCV:", error);
      if (error instanceof Error) {
        console.error("Error details:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeatureSelect = (features: string[]) => {
    const newSelectedFeatures = features.map(feature => ({
      feature,
      percentage: selectedFeatures.find(f => f.feature === feature)?.percentage || 0
    }));
    setSelectedFeatures(newSelectedFeatures);
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
    setIsReverseTuning(true);
    try {
      const response = await axios.post('http://localhost:5000/api/adjust_features', {
        features: Object.fromEntries(selectedFeatures.map(f => [f.feature, f.percentage])),
        districts: selectedDistricts,
        grades: selectedGrades,
        years: selectedYears,
      });
  
      setOriginalData(allData || []);
      setTunedData(response.data?.adjusted_data || []);
      setModelResults(response.data);  // This now only affects the tuned results
  
      if (response.data.feature_importance) {
        setTunedFeatureImportance(response.data.feature_importance);
      }
  
      setShowReverseTune(true);
    } catch (error) {
      console.error("Error performing reverse tuning:", error);
    } finally {
      setIsReverseTuning(false);
    }
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
        tunedFeatureImportance,
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
        <h1 className="text-3xl font-bold text-white">Welcome to School Achievement Dashboard!</h1>
        <div>
          <LoadModelButton 
            savedModels={savedModels.map(m => m.name)} 
            onLoad={handleLoadModel}
            onDelete={handleDeleteModel}
          />
          <RefreshButton onRefresh={handleRefresh} />
        </div>
      </div>

      {/* District, Grade, and Year Selection - Always visible until Lasso is confirmed */}
      {!showFeatureSelection && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            {/* District Selection */}
            <div>
              <span className="font-bold text-white block mb-2">Select District(s):</span>
              <MultiSelectDistrictBox 
                districts={districts}
                onSelect={handleDistrictSelect}
                selectedDistricts={selectedDistricts}
              />
            </div>

            {/* Grade Selection */}
            <div>
              <span className="font-bold text-white block mb-2">Select Grade(s):</span>
              <MultiSelectGradeBox 
                grades={grades}
                onSelect={handleGradeSelect}
                selectedGrades={selectedGrades}
              />
            </div>

            {/* Year Selection */}
            <div>
              <span className="font-bold text-white block mb-2">Select Year(s):</span>
              <MultiSelectYearBox 
                years={years}
                onSelect={handleYearSelect}
                selectedYears={selectedYears}
              />
            </div>
          </div>

          {/* Confirm Button - Centered below selection boxes */}
          <div className="flex justify-center mb-6">
            <ConfirmButton 
              onClick={handleConfirm} 
              disabled={selectedDistricts.length === 0 && selectedGrades.length === 0 && selectedYears.length === 0} 
            />
          </div>

          {/* Selected Items Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Selected Districts */}
            {selectedDistricts.map(district => (
              <SelectedDistrictCard 
                key={`district-${district}`} 
                district={district} 
                onRemove={handleDistrictRemove} 
              />
            ))}
            
            {/* Selected Grades */}
            {selectedGrades.map(grade => (
              <SelectedGradeCard 
                key={`grade-${grade}`} 
                grade={grade} 
                onRemove={handleGradeRemove} 
              />
            ))}
            
            {/* Selected Years */}
            {selectedYears.map(year => (
              <SelectedYearCard 
                key={`year-${year}`} 
                year={year} 
                onRemove={handleYearRemove} 
              />
            ))}
          </div>
        </div>
      )}


      {showTable && (
        <div className="mb-8">
          <DataTable 
            data={getCurrentPageData()} 
            columns={tableColumns}
            currentPage={currentPage}
            totalRows={totalRows}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {showLassoBox && (
        <LassoBox onConfirm={handleLassoConfirm} />
      )}

      {/* Results Layout */}
      <div className="flex flex-wrap mt-8 gap-4">
        {/* Left Side - Original Model Results */}
        {featureImportance.length > 0 && (
          <div className="flex-1 min-w-[45%]">
            <h2 className="text-2xl font-bold mb-4 text-white">Original Model Results</h2>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Feature Importance</h3>
              <FeatureImportanceChart data={featureImportance} />
            </div>
            {lassoResults && (
              <MetricsBox modelResults={lassoResults} isModelResults={true} />
            )}
          </div>
        )}

          {/* Right Side - Tuned Results */}
          {showReverseTune && modelResults && (
          <div className="flex-1 min-w-[45%]">
            <h2 className="text-2xl font-bold mb-4 text-white">Tuned Model Results</h2>
            {tunedFeatureImportance.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Feature Importance After Tuning</h3>
                <FeatureImportanceChart data={tunedFeatureImportance} />
              </div>
            )}
            <MetricsBox modelResults={modelResults} isModelResults={false} />
          </div>
        )}
      </div>

      {/* Feature Selection Section */}
      {showFeatureSelection && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-white">Select Features to Tune for Reverse Tuning:</h2>
          <MultiSelectFeatureBox 
            features={availableFeatures}
            onSelect={handleFeatureSelect}
            selectedFeatures={selectedFeatures.map(f => f.feature)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {selectedFeatures.map(({ feature, percentage }) => (
              <SelectedFeatureCard
                key={feature}
                feature={feature}
                onRemove={handleFeatureRemove}
                onPercentageChange={handleFeaturePercentageChange}
              />
            ))}
          </div>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleReverseTuneConfirm}
            disabled={isReverseTuning}
          >
            {isReverseTuning ? 'Performing Reverse Tuning...' : 'Perform Reverse Tuning'}
          </button>
        </div>
      )}

      {/* Comparison Data Table */}
      {showReverseTune && modelResults && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-white">Data Comparison After Tuning</h2>
          <TunedDataTable 
            tunedData={modelResults?.comparison_data || []}
            currentPage={currentPage}
            totalRows={modelResults?.comparison_data?.length || 0}
            onPageChange={handlePageChange}
          />
          
          <div className="mt-4">
            <SaveModelButton onSave={handleSaveModel} />
          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {(isLoading || isReverseTuning) && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>
      )}

      {/* Warning Popup */}
      <WarningPopup 
        isOpen={showWarning}
        onClose={() => setShowWarning(false)}
        onConfirm={handleWarningConfirm}
        message="The number of selected districts might affect model performance. Proceed?"
      />
    </div>
  );
}
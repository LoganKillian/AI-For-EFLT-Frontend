# School Achievment Tool
You can check out the full version here [https://ml-school-tool.vercel.app/](https://ml-school-tool.vercel.app/)

Currently an ongoing project of the Dept. of EFLT at Auburn University, this is a Flask and React based machine learning tool to improve Alabama school performance. The models used are run on a static dataset hosted on the flask server. The tool works by first utilizing Lasso Regression to reduce the total amount of features present in the dataset. Then a reverse prediction is made utilizing ExtraTreesRegressor. The user can change the parameters of the models used in each step. 
For each trial, the user is presented with 2 main pieces of data 

1. Lasso provides feature strengths from the whole dataset - this gives a general idea of what broadly impacts performance, positively or negatively
2. Reverse prediction provides the percent change for each feature needed to attain a certain increase in a schools performance
---
### How to Build It Yourself (Current Version)
Flask/backend [here](https://github.com/bls0053/ml-school-flask) and React/frontend [here](https://github.com/bls0053/ml-school-tool).
1. **Clone the Flask Repository**\
    $ `git clone https://github.com/bls0053/ml-school-flask.git`

2. **Activate Python Virtual Environment**\
    $`venv/scripts/activate`  

3. **Install Python Dependencies**\
    $ `pip install -r requirements.txt`

4. **Run the Flask Server**\
    $ `Python main.py`

5. **Clone the React Repository**\
    $ `git clone https://github.com/bls0053/ml-school-tool.git`

6. **Install React Dependencies**\
    $ `npm install`

7. **Run the Development Server**\
    $ `npm run dev`






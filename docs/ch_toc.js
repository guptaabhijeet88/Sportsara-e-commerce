function getTOC() {
  return `
<div class="page">
  <h1 class="chapter-title" style="margin-top:20pt;">Table of Contents</h1>
  <table class="toc-table">
  <tr><th>Sr No</th><th>Description</th><th>Page No</th></tr>
  <tr><td colspan="3" class="center bold">CHAPTER 1: INTRODUCTION</td></tr>
  <tr><td class="center">1</td><td>1.1 Introduction to the System</td><td class="center">2</td></tr>
  <tr><td class="center">2</td><td>1.2 Problem Definition</td><td class="center">2</td></tr>
  <tr><td class="center">3</td><td>1.3 Aim</td><td class="center">3</td></tr>
  <tr><td class="center">4</td><td>1.4 Objectives</td><td class="center">3</td></tr>
  <tr><td class="center">5</td><td>1.5 Goal</td><td class="center">3</td></tr>
  <tr><td class="center">6</td><td>1.6 Need of the System</td><td class="center">3</td></tr>
  <tr><td class="center">7</td><td>1.7 Scope of the Project</td><td class="center">4</td></tr>
  </table>

  <table class="toc-table">
  <tr><th>Sr No</th><th>Description</th><th>Page No</th></tr>
  <tr><td colspan="3" class="center bold">CHAPTER 2: REQUIREMENT SPECIFICATION</td></tr>
  <tr><td class="center">8</td><td>2.1 Introduction</td><td class="center">5</td></tr>
  <tr><td class="center">9</td><td>2.2 System Environment</td><td class="center">5</td></tr>
  <tr><td class="center">10</td><td>2.3 Software Requirements</td><td class="center">5</td></tr>
  <tr><td class="center">11</td><td>2.4 Hardware Requirements</td><td class="center">6</td></tr>
  <tr><td class="center">12</td><td>2.5 Methodology</td><td class="center">6</td></tr>
  </table>

  <table class="toc-table">
  <tr><th>Sr No</th><th>Description</th><th>Page No</th></tr>
  <tr><td colspan="3" class="center bold">CHAPTER 3: SYSTEM ANALYSIS</td></tr>
  <tr><td class="center">13</td><td>3.1 Introduction</td><td class="center">8</td></tr>
  <tr><td class="center">14</td><td>3.2 Existing System Analysis</td><td class="center">8</td></tr>
  <tr><td class="center">15</td><td>3.3 Proposed System</td><td class="center">8</td></tr>
  <tr><td class="center">16</td><td>3.4 Feasibility Analysis</td><td class="center">8</td></tr>
  <tr><td class="center">17</td><td>3.5 Functional Requirements</td><td class="center">9</td></tr>
  <tr><td class="center">18</td><td>3.6 Non-Functional Requirements</td><td class="center">9</td></tr>
  <tr><td class="center">19</td><td>3.7 Use Case Analysis</td><td class="center">9</td></tr>
  <tr><td class="center">20</td><td>3.8 Gantt Chart</td><td class="center">10</td></tr>
  </table>

  <table class="toc-table">
  <tr><th>Sr No</th><th>Description</th><th>Page No</th></tr>
  <tr><td colspan="3" class="center bold">CHAPTER 4: SURVEY OF TECHNOLOGY</td></tr>
  <tr><td class="center">21</td><td>4.1 Technology Stack Overview</td><td class="center">11</td></tr>
  <tr><td class="center">22</td><td>4.2 Frontend Technologies</td><td class="center">11</td></tr>
  <tr><td class="center">23</td><td>4.3 Backend Technologies</td><td class="center">12</td></tr>
  <tr><td class="center">24</td><td>4.4 Database Technology</td><td class="center">12</td></tr>
  <tr><td class="center">25</td><td>4.5 Authentication Technologies</td><td class="center">13</td></tr>
  <tr><td class="center">26</td><td>4.6 Technology Comparison</td><td class="center">14</td></tr>
  <tr><td class="center">27</td><td>4.7 Working Principles</td><td class="center">15</td></tr>
  </table>

  <table class="toc-table">
  <tr><th>Sr No</th><th>Description</th><th>Page No</th></tr>
  <tr><td colspan="3" class="center bold">CHAPTER 5: SYSTEM DESIGN</td></tr>
  <tr><td class="center">28</td><td>5.1 System Architecture</td><td class="center">17</td></tr>
  <tr><td class="center">29</td><td>5.2 Data Flow Diagram</td><td class="center">17</td></tr>
  <tr><td class="center">30</td><td>5.3 Database Schema</td><td class="center">18</td></tr>
  <tr><td class="center">31</td><td>5.4 REST API Design</td><td class="center">20</td></tr>
  <tr><td class="center">32</td><td>5.5 E-R Diagram</td><td class="center">21</td></tr>
  <tr><td class="center">33</td><td>5.6 Sequence Diagrams</td><td class="center">21</td></tr>
  </table>

  <table class="toc-table">
  <tr><th>Sr No</th><th>Description</th><th>Page No</th></tr>
  <tr><td colspan="3" class="center bold">CHAPTER 6: SYSTEM IMPLEMENTATION</td></tr>
  <tr><td class="center">34</td><td>6.1 Project Structure</td><td class="center">22</td></tr>
  <tr><td class="center">35</td><td>6.2 Server Configuration</td><td class="center">23</td></tr>
  <tr><td class="center">36</td><td>6.3 Authentication Module</td><td class="center">24</td></tr>
  <tr><td class="center">37</td><td>6.4 Cart Management Module</td><td class="center">25</td></tr>
  <tr><td class="center">38</td><td>6.5 Order Processing Module</td><td class="center">25</td></tr>
  <tr><td class="center">39</td><td>6.6 Review System Module</td><td class="center">26</td></tr>
  <tr><td class="center">40</td><td>6.7 Admin Dashboard Module</td><td class="center">26</td></tr>
  <tr><td class="center">41</td><td>6.8 Email Service Module</td><td class="center">27</td></tr>
  <tr><td class="center">42</td><td>6.9 Test Cases</td><td class="center">28</td></tr>
  </table>

  <table class="toc-table">
  <tr><th>Sr No</th><th>Description</th><th>Page No</th></tr>
  <tr><td colspan="3" class="center bold">CHAPTER 7: RESULT</td></tr>
  <tr><td class="center">43</td><td>7.1 Introduction</td><td class="center">29</td></tr>
  <tr><td class="center">44</td><td>7.2 Screens Achieved in the Project</td><td class="center">30</td></tr>
  <tr><td class="center">45</td><td>7.3 Functional Results</td><td class="center">37</td></tr>
  <tr><td class="center">46</td><td>7.4 Performance Results</td><td class="center">39</td></tr>
  <tr><td class="center">47</td><td>7.5 Security Results</td><td class="center">40</td></tr>
  <tr><td class="center">48</td><td>7.6 Deployment Configuration</td><td class="center">42</td></tr>
  </table>

  <table class="toc-table">
  <tr><th>Sr No</th><th>Description</th><th>Page No</th></tr>
  <tr><td colspan="3" class="center bold">CHAPTER 8: CONCLUSION AND FUTURE SCOPE</td></tr>
  <tr><td class="center">49</td><td>8.1 Conclusion</td><td class="center">46</td></tr>
  <tr><td class="center">50</td><td>8.2 Future Enhancement</td><td class="center">47</td></tr>
  <tr><td class="center">51</td><td>8.3 Lessons Learned</td><td class="center">48</td></tr>
  </table>

  <table class="toc-table">
  <tr><th>Sr No</th><th>Description</th><th>Page No</th></tr>
  <tr><td colspan="3" class="center bold">CHAPTER 9: REFERENCES</td></tr>
  <tr><td class="center">52</td><td>9.1 Book References</td><td class="center">49</td></tr>
  <tr><td class="center">53</td><td>9.2 Technology Documentation</td><td class="center">49</td></tr>
  <tr><td class="center">54</td><td>9.3 Web References</td><td class="center">49</td></tr>
  </table>

  <table class="toc-table">
  <tr><th>Sr No</th><th>Description</th><th>Page No</th></tr>
  <tr><td colspan="3" class="center bold">APPENDICES</td></tr>
  <tr><td class="center">55</td><td>Appendix A: Glossary</td><td class="center">50</td></tr>
  <tr><td class="center">56</td><td>Appendix B: Abbreviations</td><td class="center">51</td></tr>
  <tr><td class="center">57</td><td>Appendix C: NPM Dependencies</td><td class="center">51</td></tr>
  </table>
</div>`;
}
module.exports = { getTOC };

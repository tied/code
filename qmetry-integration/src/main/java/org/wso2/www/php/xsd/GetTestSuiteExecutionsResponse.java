/**
 * GetTestSuiteExecutionsResponse.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package org.wso2.www.php.xsd;

public class GetTestSuiteExecutionsResponse  implements java.io.Serializable {
    private org.wso2.www.php.xsd.TestSuiteExecution[] testSuiteExecutions;

    public GetTestSuiteExecutionsResponse() {
    }

    public GetTestSuiteExecutionsResponse(
           org.wso2.www.php.xsd.TestSuiteExecution[] testSuiteExecutions) {
           this.testSuiteExecutions = testSuiteExecutions;
    }


    /**
     * Gets the testSuiteExecutions value for this GetTestSuiteExecutionsResponse.
     * 
     * @return testSuiteExecutions
     */
    public org.wso2.www.php.xsd.TestSuiteExecution[] getTestSuiteExecutions() {
        return testSuiteExecutions;
    }


    /**
     * Sets the testSuiteExecutions value for this GetTestSuiteExecutionsResponse.
     * 
     * @param testSuiteExecutions
     */
    public void setTestSuiteExecutions(org.wso2.www.php.xsd.TestSuiteExecution[] testSuiteExecutions) {
        this.testSuiteExecutions = testSuiteExecutions;
    }

    public org.wso2.www.php.xsd.TestSuiteExecution getTestSuiteExecutions(int i) {
        return this.testSuiteExecutions[i];
    }

    public void setTestSuiteExecutions(int i, org.wso2.www.php.xsd.TestSuiteExecution _value) {
        this.testSuiteExecutions[i] = _value;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof GetTestSuiteExecutionsResponse)) return false;
        GetTestSuiteExecutionsResponse other = (GetTestSuiteExecutionsResponse) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.testSuiteExecutions==null && other.getTestSuiteExecutions()==null) || 
             (this.testSuiteExecutions!=null &&
              java.util.Arrays.equals(this.testSuiteExecutions, other.getTestSuiteExecutions())));
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = 1;
        if (getTestSuiteExecutions() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getTestSuiteExecutions());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getTestSuiteExecutions(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(GetTestSuiteExecutionsResponse.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://www.wso2.org/php/xsd", ">getTestSuiteExecutionsResponse"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("testSuiteExecutions");
        elemField.setXmlName(new javax.xml.namespace.QName("http://www.wso2.org/php/xsd", "TestSuiteExecutions"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.wso2.org/php/xsd", "TestSuiteExecution"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        elemField.setMaxOccursUnbounded(true);
        typeDesc.addFieldDesc(elemField);
    }

    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

    /**
     * Get Custom Serializer
     */
    public static org.apache.axis.encoding.Serializer getSerializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanSerializer(
            _javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanDeserializer(
            _javaType, _xmlType, typeDesc);
    }

}
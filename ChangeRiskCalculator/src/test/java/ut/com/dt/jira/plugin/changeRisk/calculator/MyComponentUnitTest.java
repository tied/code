package ut.com.dt.jira.plugin.changeRisk.calculator;

import org.junit.Test;
import com.dt.jira.plugin.changeRisk.calculator.MyPluginComponent;
import com.dt.jira.plugin.changeRisk.calculator.MyPluginComponentImpl;

import static org.junit.Assert.assertEquals;

public class MyComponentUnitTest
{
    @Test
    public void testMyName()
    {
        MyPluginComponent component = new MyPluginComponentImpl(null);
        assertEquals("names do not match!", "myComponent",component.getName());
    }
}
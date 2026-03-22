using System;
using System.Collections.Generic;
using System.Web.Mvc;
using LoanManagement.Interfaces;
using LoanManagement.DataAccess;

public class SimpleResolver : IDependencyResolver
{
    public object GetService(Type serviceType)
    {
        // Map each controller to its concrete implementation
        if (serviceType == typeof(LoanManagement.Controllers.LoanController))
            return new LoanManagement.Controllers.LoanController(new DALoan());

        if (serviceType == typeof(LoanManagement.Controllers.BorrowerController))
            return new LoanManagement.Controllers.BorrowerController(new DABorrower());

        if (serviceType == typeof(LoanManagement.Controllers.LoanApplicationController))
            return new LoanManagement.Controllers.LoanApplicationController(new DALoanApplication());

        if (serviceType == typeof(LoanManagement.Controllers.LoanProductController))
            return new LoanManagement.Controllers.LoanProductController(new DALoanProduct());

        if (serviceType == typeof(LoanManagement.Controllers.PaymentController))
            return new LoanManagement.Controllers.PaymentController(new DAPayment());

        if (serviceType == typeof(LoanManagement.Controllers.PaymentAllocationController))
            return new LoanManagement.Controllers.PaymentAllocationController(new DAPaymentAllocation());

        if (serviceType == typeof(LoanManagement.Controllers.RepaymentScheduleController))
            return new LoanManagement.Controllers.RepaymentScheduleController(new DARepaymentSchedule());

        if (serviceType == typeof(LoanManagement.Controllers.UserController))
            return new LoanManagement.Controllers.UserController(new DAUser());

        if (serviceType == typeof(LoanManagement.Controllers.RoleController))
            return new LoanManagement.Controllers.RoleController(new DARole());

        return null; // default MVC behavior for other types
    }

    public IEnumerable<object> GetServices(Type serviceType)
    {
        return new List<object>();
    }
}

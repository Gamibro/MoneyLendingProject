using LoanManagement.DataAccess;
using LoanManagement.Interfaces;
using MoneyLending1.BusinessLayer;
using MoneyLending1.Interfaces;
using System.Web.Mvc;
using Unity;
using Unity.Mvc5;

namespace MoneyLending1
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();
            container.RegisterType<ILoanProduct, DALoanProduct>();
            container.RegisterType<IUser, DAUser>();
            container.RegisterType<IRole, DARole>();
            container.RegisterType<IBorrower, DABorrower>();
            container.RegisterType<ILoanApplication, DALoanApplication>();
            container.RegisterType<ILoan, DALoan>();
            container.RegisterType<IRepaymentSchedule, DARepaymentSchedule>();
            container.RegisterType<IPayment, DAPayment>();
            container.RegisterType<IPaymentAllocation, DAPaymentAllocation>();

            container.RegisterType<IJwtTokenService,JsonTokenGenerator>();

            
            DependencyResolver.SetResolver(new UnityDependencyResolver(container));
        }
    }
}
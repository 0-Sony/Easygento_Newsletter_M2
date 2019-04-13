<?php
/**
 * @license http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 * @author Phuong LE <sony@meincode.com> <@>
 * @copyright Copyright (c) 2019 Menincode (http://www.menincode.com)
 */

namespace Easygento\Newsletter\Api\Data;
use Magento\Newsletter\Model\Subscriber;


interface SubscriptionInterface
{
    /**
     * @param string $email
     * @return save customer
     */
    public function save(string $email);

    /**
     * @param int $customerId
     * @return mixed
     */
    public function delete(int $customerId);

    /**
     * @param string $email
     * @return mixed
     */
    public function updateStatus(string $email);
}